"use strict";
exports.__esModule = true;
var spacingTokens = [
    { sig: 'spacer', val: 4, type: 'spacing' },
    { sig: 'spacer', val: 8, type: 'spacing' },
    { sig: 'spacer', val: 16, type: 'spacing' },
    { sig: 'spacer', val: 24, type: 'spacing' },
    { sig: 'spacer', val: 32, type: 'spacing' },
    { sig: 'spacer', val: 40, type: 'spacing' },
    { sig: 'spacer', val: 48, type: 'spacing' },
    { sig: 'spacer', val: 56, type: 'spacing' },
];
var exportSass = function (prefix) {
    return spacingTokens.map(function (e) { return "$".concat(prefix).concat(e.sig, ": ").concat(e.val); });
};
var Spacing = {
    data: spacingTokens,
    exportSass: exportSass
};
exports["default"] = Spacing;
