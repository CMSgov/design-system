import * as fs from 'fs';
import * as path from 'path';
import {
  FlattenedTokensByFile,
  isValidTokenFileName,
  collectionAndModeFromFileName,
  TokensFile,
  flattenTokens,
} from './tokens';

/**
 * Reads all the tokens in a given tokens directory into an object keyed by the filename.
 * Each file object contains a flattened dictionary of all tokens in that file, keyed by
 * a flattened string representing the key of that token within the hierarchy of its
 * parent token groups. See the doc comment for the `TokensFile` type for more details.
 */

export function readTokenFiles(tokensDir: string): FlattenedTokensByFile {
  const files = fs
    .readdirSync(tokensDir)
    .filter(isValidTokenFileName)
    .map((fileName: string) => `${tokensDir}/${fileName}`);

  const tokensJsonByFile: FlattenedTokensByFile = {};

  const seenCollectionsAndModes = new Set<string>();

  files.forEach((file) => {
    const baseFileName = path.basename(file);
    const { collectionName, modeName } = collectionAndModeFromFileName(baseFileName);

    if (seenCollectionsAndModes.has(`${collectionName}.${modeName}`)) {
      throw new Error(`Duplicate collection and mode in file: ${file}`);
    }

    seenCollectionsAndModes.add(`${collectionName}.${modeName}`);

    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    if (!fileContent) {
      throw new Error(`Invalid tokens file: ${file}. File is empty.`);
    }
    const tokensFile: TokensFile = JSON.parse(fileContent);

    tokensJsonByFile[baseFileName] = flattenTokens(tokensFile);
  });

  return tokensJsonByFile;
}
