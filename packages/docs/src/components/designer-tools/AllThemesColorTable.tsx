import React from 'react';
import themes from '../../../../../themes.json';
import {
  ThemeName,
  getThemeColorValue,
  themeTokens,
  getSystemColorTokenFromValue,
} from '../../helpers/themeTokens';
import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@cmsgov/design-system';
import { hexHasTransparency, pickTextColor } from 'design-system-tokens/src/lib/utility';
import { HexValue } from 'design-system-tokens/src/lib/types';

const DARK_TEXT = 'var(--color-base)';
const LIGHT_TEXT = 'var(--color-base-inverse)';

const colorTokenKeys = Object.keys(themeTokens.core.color);

/**
 * Used to show a set of related colors. It's a collection of `ColorExampleRow`
 * items. Note that this does not show a special transparency background to
 * support semi-transparent colors like the `ColorRamps` component does.
 */
const AllThemesColorTable = () => (
  <Table stackable stackableBreakpoint="md">
    <TableCaption>All theme colors</TableCaption>
    <TableHead>
      <TableRow>
        <TableCell scope="col" id="token-name">
          Token name
        </TableCell>
        {Object.entries(themes).map(([themeKey, themeData]) => (
          <TableCell scope="col" id={themeKey} key={themeKey}>
            {themeData.displayName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {colorTokenKeys.map((tokenKey) => (
        <TableRow key={tokenKey}>
          <TableCell headers="token-name" stackedTitle="All theme colors">
            <code className="c-color-example-row__name">{tokenKey}</code>
          </TableCell>
          {Object.entries(themes).map(([themeKey, themeData]) => {
            const value = getThemeColorValue(themeKey as ThemeName, tokenKey);
            const cellStyle: React.CSSProperties = {
              backgroundColor: value,
            };
            const textColor = pickTextColor(value as HexValue, LIGHT_TEXT, DARK_TEXT);
            const codeStyle: React.CSSProperties = hexHasTransparency(value as HexValue)
              ? {}
              : {
                  color: textColor,
                  background: 'transparent',
                };
            const tokenDisplayName = getSystemColorTokenFromValue(value);

            return (
              <TableCell
                headers={themeKey}
                stackedTitle={themeData.displayName}
                style={cellStyle}
                key={themeKey}
              >
                <code className="c-color-example-row__value" style={codeStyle}>
                  {tokenDisplayName}
                </code>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default AllThemesColorTable;
