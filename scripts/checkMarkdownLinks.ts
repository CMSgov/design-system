import { sh, shI } from './utils';
import path from 'node:path';
import fs from 'node:fs';

interface ConfirmUrls {
  [key: string]: Array<string>;
}

const appDir = path.resolve(__dirname, '..');
const fileExtensions = ['.md', '.mdx'];
const searchExpression = /[http]*[s]*:\/\/[\S]*?[^\)\]\(\"' \n]*/g;
let foundFiles;
const urlsToCheck: ConfirmUrls = {};

const commandBase = `find ${appDir} `;
const commandArgs = fileExtensions
  .map((ext) => {
    return `-type f -name '*${ext}' -not -path '*/node_modules/*' -not -path '*/.github/*'`;
  })
  .join(` -or `);

const findCommand = commandBase.concat(commandArgs);

try {
  foundFiles = sh(findCommand);
} catch (error) {
  console.log('Your find command failed with the following error:', error);
}

if (!foundFiles) {
  console.log(`No files found with the extensions ${fileExtensions.join(', ')} in ${appDir}.`);
}

const allFiles = foundFiles?.split('\n');

function findLinks(filePath: string, regex: RegExp): void {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const matches = fileContent.match(regex);
    if (matches) {
      (urlsToCheck as ConfirmUrls)[filePath] = matches;
    }
  } catch (error) {
    console.log(error);
  }
}

allFiles?.forEach((file) => findLinks(file, searchExpression));
console.log(urlsToCheck);

// Write function to confirm the link is ok to check
// Write function to check the link with curl
