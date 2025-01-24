import { Accordion, AccordionItem } from '@cmsgov/design-system';
import { FC, PropsWithChildren } from 'react';
import { ThemeName, determineColorCategoryUsageByTheme } from '../../../helpers/themeTokens';
import { ColorCard } from './ColorCard';

interface ColorProps extends PropsWithChildren {
  /**
   * color categories such as "primary", "secondary, "accent"
   */
  colorCategory: string | string[];
  /**
   * Name of currently selected theme
   */
  theme: ThemeName;
  /**
   * Whether to match the color category exactly or not
   */
  exactMatch?: boolean;
}

const ColorTable: FC<ColorProps> = ({ colorCategory, theme, exactMatch }) => {
  const { activeColors, availableColors } = determineColorCategoryUsageByTheme({
    colorCategory,
    themeName: theme,
    exactMatch,
  });

  return (
    <>
      {Boolean(activeColors.length) && (
        <Accordion bordered className="ds-u-margin-top--2">
          <AccordionItem heading="Active Colors" defaultOpen={true}>
            <p className="ds-u-margin-bottom--2">
              These colors are currently found in components throughout the design system, but don’t
              represent the entire available palette.
            </p>
            {activeColors.map(({ name, attributes }) => (
              <ColorCard key={name} attributes={attributes} />
            ))}
          </AccordionItem>
        </Accordion>
      )}
      {Boolean(availableColors.length) && (
        <Accordion bordered>
          <AccordionItem heading="Available Colors" defaultOpen={false}>
            <p className="ds-u-margin-bottom--2">
              These colors are available as part of the system palette, but are not currently used
              in existing components. Using these colors? Let the DS team know.
            </p>
            {availableColors.map(({ name, attributes }) => (
              <ColorCard key={name} attributes={attributes} />
            ))}
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default ColorTable;
