import { sh } from './utils';
import path from 'node:path';
import fs from 'node:fs';

interface ConfirmUrls {
  [key: string]: Array<string>;
}

// Some constants:
const appDir = path.resolve(__dirname, '..');
const fileExtensions = ['.md', '.mdx'];
const searchExpression = /[http]*[s]*:\/\/[\S]*?[^\)\]\(\"' \n]*/g;
let foundFiles: string | undefined;
const urlsToCheck: ConfirmUrls = {};

// Construct our command:
const commandBase = `find ${appDir} `;
const commandArgs = fileExtensions
  .map((ext) => {
    return `-type f -name '*${ext}' -not -path '*/node_modules/*' -not -path '*/.github/*'`;
  })
  .join(` -or `);

const findCommand = commandBase.concat(commandArgs);

// Determine if the url we want to query is ok:
function isValidUrl(url: string): boolean {
  let urlHolder: URL;
  try {
    urlHolder = new URL(url);
  } catch (_) {
    return false;
  }
  if (urlHolder.hostname.includes('localhost')) {
    return false;
  }
  return true;
}

// Extract links from a particular md/mdx file and place into predefined object:
function findLinks(filePath: string, regex: RegExp): void {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const matches: RegExpMatchArray | null = fileContent.match(regex);
    if (matches) {
      (urlsToCheck as ConfirmUrls)[filePath] = matches.filter((match) => {
        if (isValidUrl(match)) {
          return match;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// Run our command and plop string output into a variable:
try {
  foundFiles = sh(findCommand);
} catch (error) {
  console.log('Your find command failed with the following error:', error);
}

if (!foundFiles) {
  console.log(`No files found with the extensions ${fileExtensions.join(', ')} in ${appDir}.`);
}

const allFiles = foundFiles?.split('\n');

allFiles?.forEach((file) => findLinks(file, searchExpression));

// Write function to check the link with curl
function curl(url: string): void {
  const resCode = sh(`curl -o - -I -s ${url}`);
  console.log(resCode);
}

for (const [page, links] of Object.entries(urlsToCheck)) {
  console.log(page);
  links.forEach((link) => curl(link));
}
// Write non-200 status urls to file
