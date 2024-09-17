import path from 'path';
import { readTokenFiles } from '../lib/readTokenFiles';
import {
  enforceSassVariableOrder,
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
  it('enforceSassVariableOrder makes sure no variables are used before declared', () => {
    const vars = [
      '$color-info: #3e94cf;',
      '$font-weight-button-lg: $font-weight-bold;',
      '$font-weight-button-md: $font-weight-bold;',
      '$font-weight-button-sm: $font-weight-normal;',
      '$font-weight-normal: 400;',
      '$font-weight-bold: 700;',
      '$alert__border-left-color: $color-info;',
    ];

    expect(enforceSassVariableOrder(vars)).toEqual([
      '$color-info: #3e94cf;',
      '$font-weight-normal: 400;',
      '$font-weight-button-sm: $font-weight-normal;',
      '$font-weight-bold: 700;',
      '$font-weight-button-md: $font-weight-bold;',
      '$font-weight-button-lg: $font-weight-bold;',
      '$alert__border-left-color: $color-info;',
    ]);
  });

  it('matches snapshot', () => {
    const files = tokenFilesToScssFiles(tokensByFile);

    // Acknowledge but don't snapshot the duplicated files
    expect(files['core-component-tokens.scss']).toBeTruthy();
    expect(files['core-tokens.scss']).toBeTruthy();
    expect(files['cmsgov-component-tokens.scss']).toBeTruthy();
    expect(files['cmsgov-tokens.scss']).toBeTruthy();
    delete files['core-component-tokens.scss'];
    delete files['core-tokens.scss'];
    delete files['cmsgov-component-tokens.scss'];
    delete files['cmsgov-tokens.scss'];

    expect(files).toMatchSnapshot();
  });
});

describe('tokenFilesToScssLayoutFiles', () => {
  it('matches snapshot', () => {
    expect(tokenFilesToScssLayoutFiles(tokensByFile)).toMatchSnapshot();
  });
});
