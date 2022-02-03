import * as Tokens from '../tokens';
import * as Utils from '../lib/utility';
import coreTheme from '../brands/core/default';

console.log(Tokens.color['color-blue-900']);
console.log(Tokens.spacing['spacer-5']);
console.log(coreTheme.spacing['spacer-6']);
console.log(Tokens.color.white);

console.log(Utils.HexToRgb(Tokens.color['color-blue-900']));
console.log(Utils.RgbToHex(24,14,230));
