import * as Tokens from '../src/tokens';
import * as Utils from '../src/lib/utility';
import coreTheme from '../src/themes/core/defaultTheme';

console.log(Tokens.color['ocean-900']);
console.log(Tokens.spacing['spacer-5']);
console.log(coreTheme.spacing['spacer-6']);
console.log(Tokens.color.white);

console.log(Utils.hexToRgb(Tokens.color['cerulean-900']));
console.log(Utils.rgbToHex(24, 14, 230));
