import * as Tokens from '../tokens';
import * as Utils from '../lib/utility';
import coreTheme from '../brands/core/default-theme';

console.log(Tokens.Color['color-blue-teal-900']);
console.log(Tokens.Spacing['spacer-5']);
console.log(coreTheme.tokens.spacing['spacer-6']);

console.log(Utils.HexToRgb(Tokens.Color['color-blue-teal-900']));
console.log(Utils.RgbToHex(24,14,230));
