/* eslint-disable no-console */
import 'dotenv/config';
import FigmaApi from './FigmaApi';
import c from 'chalk';
import path from 'path';
import {
  determineNumberType,
  determineStringType,
  tokenFilesFromLocalVariables,
  writeTokenFiles,
} from './translateFigmaToTokens';
import { readTokenFiles } from '../lib/readTokenFiles';

const TOKENS_DIR = path.resolve(__dirname, '..', 'tokens');

/**
 * Pulls down tokens from our Figma design file and updates our local representation of
 * tokens, which in a standard JSON format. This requires both a Figma file key and a
 * personal access token to work.
 */
async function main() {
  if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error('PERSONAL_ACCESS_TOKEN and FILE_KEY environemnt variables are required');
  }
  const fileKey = process.env.FILE_KEY;

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN);
  const localVariables = await api.getLocalVariables(fileKey);

  const existingTokens = readTokenFiles(TOKENS_DIR);
  const tokensByFile = await tokenFilesFromLocalVariables(localVariables, existingTokens, {
    number: determineNumberType,
    string: determineStringType,
  });

  console.log('Writing token files:', Object.keys(tokensByFile));
  writeTokenFiles(TOKENS_DIR, tokensByFile);

  console.log(c.green(`✅ Tokens files have been written to the ${TOKENS_DIR} directory`));
}

main();
