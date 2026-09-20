import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const kernelRoot = resolve(scriptDir, '..');
const repoRoot = resolve(kernelRoot, '..');
const registryPath = join(kernelRoot, 'registry', 'boot-profiles-1.9.json');
const registryText = readFileSync(registryPath, 'utf8');
const registry = JSON.parse(registryText);
const outputDir = resolve(repoRoot, registry.candidate_output_directory);
const digest = value => createHash('sha256').update(value).digest('hex');

function moduleContent(name) {
  return readFileSync(join(kernelRoot, 'modules', name), 'utf8').trim();
}

function formatFragment(content) {
  let formatted = content.replaceAll('\r\n', '\n');
  if (registry.presentation.strip_source_h1) {
    formatted = formatted.replace(/^# .+\n(?:\n)?/u, '');
  }
  return formatted
    .split('\n')
    .map(line => line.replace(/[ \t]+$/u, ''))
    .join('\n')
    .trim();
}

function sectionMap(content, moduleName) {
  const lines = content.split('\n');
  const sections = new Map();
  let heading = '@preamble';
  let buffer = [];
  const commit = () => {
    const value = buffer.join('\n').trim();
    if (value) sections.set(heading, value);
  };
  for (const line of lines) {
    const match = line.match(/^## (.+)$/u);
    if (match) {
      commit();
      heading = match[1];
      buffer = [line];
    } else {
      buffer.push(line);
    }
  }
  commit();
  if (sections.size === 0) throw new Error(`No source content found in ${moduleName}`);
  return sections;
}

function resolveEntry(entry) {
  const content = moduleContent(entry.module);
  if (!entry.sections) {
    return {
      sourceContent: content,
      compiledContent: formatFragment(content),
      atoms: [...sectionMap(content, entry.module).keys()].map(section => `${entry.module}#${section}`)
    };
  }
  const sections = sectionMap(content, entry.module);
  const fragments = entry.sections.map(section => {
    if (!sections.has(section)) throw new Error(`Missing section ${entry.module}#${section}`);
    return sections.get(section);
  });
  return {
    sourceContent: fragments.join(registry.join),
    compiledContent: formatFragment(fragments.join(registry.join)),
    atoms: entry.sections.map(section => `${entry.module}#${section}`)
  };
}

function resolveProfile(id) {
  const config = registry.profiles[id];
  const entries = config.sources.map(entry => ({ source: entry, ...resolveEntry(entry) }));
  return {
    id,
    config,
    body: entries.map(entry => entry.compiledContent).join(registry.join),
    atoms: entries.flatMap(entry => entry.atoms),
    sources: entries.map(entry => ({
      module: entry.source.module,
      sections: entry.source.sections ?? null,
      source_sha256: digest(entry.sourceContent),
      compiled_sha256: digest(entry.compiledContent)
    }))
  };
}

const profiles = Object.fromEntries(Object.keys(registry.profiles).map(id => [id, resolveProfile(id)]));
const fullAtoms = new Set(profiles.FULL.atoms);
const combinedAtoms = new Set([...profiles.SLIM.atoms, ...profiles.GUIDE.atoms]);
const missing = [...fullAtoms].filter(atom => !combinedAtoms.has(atom));
const extra = [...combinedAtoms].filter(atom => !fullAtoms.has(atom));
if (missing.length || extra.length) {
  throw new Error(`Profile coverage mismatch. Missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}`);
}

const registrySha256 = digest(registryText);
const header = (profile, binding = {}) => {
  const lines = [
    `# ${registry.presentation.title}`,
    '',
    '> Generated candidate artifact. Edit authoritative modules or the profile registry, then rebuild.',
    '',
    '## Boot Identity',
    '',
    '```text',
    `PROFILE_FORMAT: ${registry.presentation.format_version}`,
    `PROFILE: ${profile.id}`,
    `TARGET_KERNEL: ${registry.target_kernel_version}`,
    `BASELINE_KERNEL: ${registry.baseline_kernel_version}`,
    `PROFILE_REGISTRY_SHA256: ${registrySha256}`,
    `ACTIVATION: ${profile.config.activation}`,
    `AUTHORIZED_TERMINAL: ${profile.config.authorized_terminal}`
  ];
  if (profile.id === 'GUIDE') lines.push('STANDALONE_AUTHORITY: false');
  if (binding.guideSha256) lines.push(`GUIDE_EXPECTED_SHA256: ${binding.guideSha256}`);
  lines.push('```', '', '---', '', '');
  return lines.join('\n');
};

const guide = `${header(profiles.GUIDE)}${profiles.GUIDE.body}\n`;
const guideSha256 = digest(guide);
const slim = `${header(profiles.SLIM, { guideSha256 })}${profiles.SLIM.body}\n`;
const full = `${header(profiles.FULL)}${profiles.FULL.body}\n`;

const artifacts = {
  FULL: { content: full, profile: profiles.FULL },
  SLIM: { content: slim, profile: profiles.SLIM },
  GUIDE: { content: guide, profile: profiles.GUIDE }
};

const compiledManifest = {
  target_kernel_version: registry.target_kernel_version,
  baseline_kernel_version: registry.baseline_kernel_version,
  status: registry.status,
  profile_format_version: registry.presentation.format_version,
  profile_registry: 'kernel/registry/boot-profiles-1.9.json',
  profile_registry_sha256: registrySha256,
  build_order: ['GUIDE', 'SLIM', 'FULL', 'MANIFEST'],
  guide_binding: {
    slim_field: 'GUIDE_EXPECTED_SHA256',
    expected_sha256: guideSha256
  },
  coverage: {
    equation: 'COVERAGE(SLIM ∪ GUIDE) = COVERAGE(FULL)',
    status: 'PASS',
    atom_count: fullAtoms.size,
    atoms: [...fullAtoms]
  },
  artifacts: Object.fromEntries(Object.entries(artifacts).map(([id, artifact]) => [id, {
    file: artifact.profile.config.output,
    activation: artifact.profile.config.activation,
    authorized_terminal: artifact.profile.config.authorized_terminal,
    sha256: digest(artifact.content),
    bytes: Buffer.byteLength(artifact.content),
    sources: artifact.profile.sources
  }]))
};
const manifestText = `${JSON.stringify(compiledManifest, null, 2)}\n`;

const expectedFiles = new Map([
  ...Object.values(artifacts).map(artifact => [artifact.profile.config.output, artifact.content]),
  ['profiles.json', manifestText]
]);

if (process.argv.includes('--check')) {
  for (const [name, content] of expectedFiles) {
    const path = join(outputDir, name);
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) {
      throw new Error(`Boot profile candidate drift: ${path}`);
    }
  }
  process.stdout.write(`Kernel ${registry.target_kernel_version} boot profile parity: ${expectedFiles.size} artifacts PASS\n`);
} else {
  mkdirSync(outputDir, { recursive: true });
  for (const [name, content] of expectedFiles) writeFileSync(join(outputDir, name), content, 'utf8');
  process.stdout.write(`Built Kernel ${registry.target_kernel_version} boot profile candidates: GUIDE ${guideSha256}\n`);
}
