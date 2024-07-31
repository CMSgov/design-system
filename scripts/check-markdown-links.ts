import { sh } from './utils';
import path from 'node:path';
import fs from 'node:fs';
import fetch from 'node-fetch';
interface FilesAndLinks {
  [key: string]: Array<string>;
}

// Construct our find command:
const appDir = path.resolve(__dirname, '..');
const fileExtensions = ['.md', '.mdx'];
const commandBase = `find ${appDir} `;
const commandArgs = fileExtensions
  .map((ext) => {
    return `-type f -name '*${ext}' -not -path '*/node_modules/*' -not -path '*/.github/*'`;
  })
  .join(` -or `);

const findCommand = commandBase.concat(commandArgs);

// Prevents us trying to call localhost urls.
function isValidUrl(url: string): boolean {
  let urlHolder: URL;
  try {
    urlHolder = new URL(url);
  } catch (error) {
    console.log(
      `${url} could not be turned into a proper URL. Maybe explicitly exclude this type of thing?`
    );
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
      (urlsToCheck as FilesAndLinks)[filePath] = matches.filter((match) => {
        if (isValidUrl(match)) {
          return match;
        }
      });
    }
  } catch (error) {
    console.log(
      `An error occurred when parsing this file: ${filePath}. \nHere's the error:\n ${error}`
    );
  }
}

// Output file is a text file:
const outputFileName = `${appDir}/brokenLinkReport.txt`;

// Use node-fetch to query urls and return a status code:
function curl(file: string, url: string): void {
  const spliceFrom = file.split('/').indexOf('design-system');
  const filePath: string = file.split('/').splice(spliceFrom).join('/');
  fetch(url).then((res) => {
    if (res.status !== 200) {
      const content = `Filepath: ${filePath}\n\tURL: ${url} Code: ${res.status}\n`;
      fs.writeFile(outputFileName, content, { flag: 'a+' }, (err) => {
        if (err) {
          console.error(`Could not write line to file.\nContent: ${content}. Error: ${err}`);
        }
      });
    }
  });
}

// Run our command and plop string output into a variable:
let foundFiles: string | undefined;
try {
  foundFiles = sh(findCommand);
} catch (error) {
  console.log('Your find command failed with the following error:', error);
}

const urlsToCheck: FilesAndLinks = {};

if (!foundFiles) {
  console.log(`No files found with the extensions ${fileExtensions.join(', ')} in ${appDir}.`);
  process.exit(0);
} else {
  const allFiles = foundFiles.split('\n');
  const searchExpression = /[http]*[s]*:\/\/[\S]*?[^\)\]\(\"' \n]*/g;
  allFiles.forEach((file) => findLinks(file, searchExpression));
}

// Create our file/blow away existing content:
fs.writeFile(outputFileName, '', (err) => {
  if (err) {
    console.error(`File not cleaned: ${err}`);
  } else {
    console.log('Cleaned file. Preparing to write.');
  }
});

for (const [file, links] of Object.entries(urlsToCheck)) {
  links.forEach((link) => {
    curl(file, link);
  });
}
