import path from 'path';
import { readTokenFiles } from '../lib/tokens';
import {
  tokenFilesToCssFiles,
  tokenFilesToScssFiles,
  tokenFilesToScssLayoutFiles,
  tokenNameToVarName,
} from './translate';

const tokensByFile = readTokenFiles(path.resolve(__dirname, '..', '__mocks__', 'tokens'));

describe('tokenNameToVarName', () => {
  it('handles component tokens correctly', () => {
    expect(tokenNameToVarName('component.alert.border-color')).toEqual('alert__border-color');
    expect(tokenNameToVarName('component.choice.size')).toEqual('choice__size');
    expect(tokenNameToVarName('component.choice.size--small')).toEqual('choice__size--small');
    expect(tokenNameToVarName('component.choice-label.color--disabled')).toEqual(
      'choice-label__color--disabled'
    );
  });

  it('handles theme tokens correctly', () => {
    expect(tokenNameToVarName('theme.color.primary')).toEqual('color-primary');
    expect(tokenNameToVarName('theme.font.size.base')).toEqual('font-size-base');
  });

  it('handles system tokens correctly', () => {
    expect(tokenNameToVarName('media.width-md')).toEqual('media-width-md');
    expect(tokenNameToVarName('grid.columns')).toEqual('grid-columns');
    expect(tokenNameToVarName('animation.speed.1')).toEqual('animation-speed-1');
  });
});

describe('tokenFilesToCssFiles', () => {
  it('matches snapshot', () => {
    expect(tokenFilesToCssFiles(tokensByFile)).toMatchSnapshot();
  });
});

describe('tokenFilesToScssFiles', () => {
  it('matches snapshot', () => {
    expect(tokenFilesToScssFiles(tokensByFile)).toMatchSnapshot();
  });
});

describe('tokenFilesToScssLayoutFiles', () => {
  it('matches snapshot', () => {
    expect(tokenFilesToScssLayoutFiles(tokensByFile)).toMatchSnapshot();
  });
});
