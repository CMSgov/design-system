import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '../..');

const outputDir = path.join(packageRoot, 'static');
const outputPath = path.join(outputDir, 'cms-design-system-skills.zip');

fs.mkdirSync(outputDir, { recursive: true });

execSync(`zip -r "${outputPath}" skills`, {
  cwd: packageRoot,
  stdio: 'inherit',
});