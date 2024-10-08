import c from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { sh } from './utils';

const fileEncodingOptions = { encoding: 'utf-8' as const };

const root = path.join(__dirname, '..');
const searchDir = path.join(root, 'examples');
const templatePath = path.join(root, 'examples', '_web-components-template.html');
const templateContent = fs.readFileSync(templatePath, fileEncodingOptions);

const startComment = '<!-- START WEB COMPONENT EXAMPLES -->';
const endComment = '<!-- END WEB COMPONENT EXAMPLES -->';
const searchPattern = new RegExp(`${startComment}[\\s\\S]*?${endComment}`, 'g');

async function insertTemplateContent(filePath: string) {
  const fileContent = await fs.promises.readFile(filePath, fileEncodingOptions);
  const updatedContent = fileContent.replace(
    searchPattern,
    `${startComment}\n${templateContent}\n${endComment}`
  );
  await fs.promises.writeFile(filePath, updatedContent, fileEncodingOptions);
}

// Run the grep command to find files that contain the start comment
const grepOutput = sh(`grep -rl '${startComment}' ${searchDir}`);
const filePaths = grepOutput.split('\n');
// Then insert our template content between those two comments
filePaths.forEach((filePath) => insertTemplateContent(filePath));

// And brag about it
console.log('Updated the following files:\n');
console.log(filePaths.map((f) => c.green(f)).join('\n'));
