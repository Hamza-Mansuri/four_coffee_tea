import { lstat, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const privateDirectories = new Set(['.git', '.next', '.vercel', 'node_modules', 'backend', 'src']);
const privateFile = /(?:^\.env|^(?:AGENTS|CLAUDE)\.md$|^(?:package(?:-lock)?|tsconfig|vercel)\.json$|^next\.config\.|\.(?:map|[cm]?tsx?|jsx|pem|key|p12|pfx|sql|sqlite3?|db|bak|log)$)/i;

async function walk(directory, visit, required = false) {
  let info;
  try {
    info = await lstat(directory);
  } catch (error) {
    if (error.code === 'ENOENT' && !required) return;
    throw error;
  }

  if (info.isSymbolicLink()) throw new Error(`Public symlinks are not allowed: ${directory}`);
  if (!info.isDirectory()) throw new Error(`Expected a directory: ${directory}`);

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Public symlinks are not allowed: ${filename}`);
    await visit(filename, entry);
    if (entry.isDirectory()) await walk(filename, visit, true);
  }
}

export async function checkPublicFiles(projectRoot) {
  await walk(path.join(projectRoot, 'public'), async (filename, entry) => {
    if ((entry.isDirectory() && privateDirectories.has(entry.name.toLowerCase())) || privateFile.test(entry.name)) {
      throw new Error(`Move this private/source file outside public/: ${path.relative(projectRoot, filename)}`);
    }
  });
}

export async function checkProductionBuild(projectRoot) {
  // Check only browser output. Server-side maps remain available for private debugging.
  const manifest = JSON.parse(await readFile(path.join(projectRoot, '.next', 'required-server-files.json'), 'utf8'));
  if (manifest.config.productionBrowserSourceMaps !== false) {
    throw new Error('Production browser source maps must be disabled.');
  }

  await walk(path.join(projectRoot, '.next', 'static'), async (filename, entry) => {
    if (!entry.isFile()) return;
    if (/\.map$/i.test(filename)) throw new Error(`Browser source map found: ${filename}`);
    if (/\.(?:js|css)$/i.test(filename)) {
      const content = await readFile(filename, 'utf8');
      if (/(?:\/\/[#@]|\/\*[#@])\s*sourceMappingURL\s*=/.test(content)) {
        throw new Error(`Browser source map reference found: ${filename}`);
      }
    }
  }, true);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await checkPublicFiles(process.cwd());
    if (!process.argv.includes('--public-only')) await checkProductionBuild(process.cwd());
    console.log('Public asset and browser source-map checks passed.');
  } catch (error) {
    console.error(`Public build check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
