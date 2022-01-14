"use strict";
exports.__esModule = true;
/*
 * CMSDS Color Tokens, organized by hue
 */
var ColorTokens = [
    // singletons
    { sig: 'white', val: '#FFFFFF', type: 'color' },
    { sig: 'black', val: '#000000', type: 'color' },
    // grey 
    { sig: 'grey-000', val: '#111111', type: 'color' },
    { sig: 'grey-100', val: '#333333', type: 'color' },
    { sig: 'grey-200', val: '#555555', type: 'color' },
    { sig: 'grey-300', val: '#777777', type: 'color' },
    { sig: 'grey-400', val: '#999999', type: 'color' },
    { sig: 'grey-500', val: '#AAAAAA', type: 'color' },
    { sig: 'grey-600', val: '#CCCCCC', type: 'color' },
];
/*
 * returns a single hex value from a token signature
 */
var getHex = function (sig) {
    var result = ColorTokens.filter(function (s) { return s.sig === sig; });
    return result[0].val;
};
/*
 * returns an rgb color value from a token signature
 */
var getRgb = function (sig) {
    console.log(sig);
    return '';
};
/*
 * returns an hsl color value from a token signature
 */
var getHsl = function (sig) {
    console.log(sig);
    return '';
};
/*
 * returns an array of sass variables with an optional prefix string
 * format is '$prefix-signature: hex value'
 */
var exportSass = function (prefix) {
    return ColorTokens.map(function (e) { return "$".concat(prefix).concat(e.sig, ": ").concat(e.val); });
};
var Color = {
    data: ColorTokens,
    getHex: getHex,
    getRgb: getRgb,
    getHsl: getHsl,
    exportSass: exportSass
};
exports["default"] = Color;
