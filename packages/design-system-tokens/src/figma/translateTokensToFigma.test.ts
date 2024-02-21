import path from 'path';
import testGetResponse, { emptyResponse } from './test/test-get-response';
import {
  generatePostVariablesPayload,
  getCollectionsByName,
  getVariablesByCollection,
} from './translateTokensToFigma';
import { readTokenFiles } from '../lib/tokens';

describe('getCollectionsByName', () => {
  it('returns an object of collections keyed by name', () => {
    const collections = getCollectionsByName(testGetResponse);
    expect(collections).toHaveProperty('System');
    expect(collections).toHaveProperty('Theme');
  });
});

describe('getVariablesByCollection', () => {
  it('returns a nested object organizing variables into collections', () => {
    const variables = getVariablesByCollection(testGetResponse);
    const system = variables['VariableCollectionId:111'];
    const theme = variables['VariableCollectionId:222'];
    expect(system['color/ocean/50']).toMatchSnapshot();
    expect(theme['theme/color/primary']).toMatchSnapshot();
  });
});

describe('generatePostVariablesPayload', () => {
  it('uploads nothing new when variables already match tokens', () => {
    const tokens = readTokenFiles(path.resolve(__dirname, 'test', 'tokens'));
    const payload = generatePostVariablesPayload(tokens, testGetResponse);
    expect(payload).toMatchSnapshot();
  });

  it('includes actions for adding everything when variables are empty', () => {
    const tokens = readTokenFiles(path.resolve(__dirname, 'test', 'tokens'));
    const payload = generatePostVariablesPayload(tokens, emptyResponse);
    expect(payload).toMatchSnapshot();
  });
});
