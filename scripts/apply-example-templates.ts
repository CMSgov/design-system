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
const indentationPattern = new RegExp(`^([\\s]*)${startComment}`, 'm');

async function insertTemplateContent(filePath: string) {
  const fileContent = await fs.promises.readFile(filePath, fileEncodingOptions);

  // Get the whitespace before the first comment and use that for our indentation
  const indentation = fileContent.match(indentationPattern)?.[1] ?? '';
  // Apply that same indentation to all the lines of the template content
  const templateContentWithIndentation = templateContent
    .split('\n')
    .map((line) => indentation + line)
    .join('\n');

  const updatedContent = fileContent.replace(
    searchPattern,
    `${startComment}\n${templateContentWithIndentation}${endComment}`
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
