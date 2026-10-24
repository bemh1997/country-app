import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(projectRoot, '.env');
const outputPath = resolve(
  projectRoot,
  'src/environments/countries-api-key.ts',
);

let envContents;

try {
  envContents = await readFile(envPath, 'utf8');
} catch (error) {
  if (error.code === 'ENOENT') {
    throw new Error(
      'No se encontró .env. Crea el archivo desde .env.example y configura COUNTRIES_API_KEY.',
    );
  }

  throw error;
}

const keyLine = envContents
  .split(/\r?\n/)
  .find((line) => /^\s*COUNTRIES_API_KEY\s*=/.test(line));
const match = keyLine?.match(/^\s*COUNTRIES_API_KEY\s*=\s*(.*?)\s*$/);
let apiKey = match?.[1] ?? '';

if (
  (apiKey.startsWith('"') && apiKey.endsWith('"')) ||
  (apiKey.startsWith("'") && apiKey.endsWith("'"))
) {
  apiKey = apiKey.slice(1, -1);
}

if (!apiKey) {
  throw new Error('COUNTRIES_API_KEY está vacía en el archivo .env.');
}

await writeFile(
  outputPath,
  `export const countriesApiKey = ${JSON.stringify(apiKey)};\n`,
  'utf8',
);
