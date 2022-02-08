import { color, spacing } from '../src/tokens';
import { rgbToHex, hexToRgb } from '../src/lib/utility';
import coreTheme from '../src/themes/core/defaultTheme';

console.log(color['ocean-900']);
console.log(spacing['spacer-5']);
console.log(coreTheme.spacing['spacer-6']);
console.log(color.white);

console.log(hexToRgb(color['cerulean-900']));
console.log(rgbToHex(24, 14, 230));
