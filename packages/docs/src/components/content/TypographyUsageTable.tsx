import {
  Badge,
  CloseIconThin,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '@cmsgov/design-system';
import themes from '../../../../../themes.json';
import { capitalize } from '../../helpers/capitalize';
type ThemeName = keyof typeof themes;

type DataItem = {
  cssClass: string;
  figmaToken: string;
  example?: string | { [key in ThemeName]: string | null };
  usage?: string | { [key in ThemeName]: string | null };
};

type Header = {
  dataKey: keyof DataItem;
  label: string;
};

export interface TypographyProps {
  /**
   * The table caption contents.
   */
  caption: React.ReactNode;
  /**
   * An array of objects containing a "dataKey" used to relate cells (rendered as `<td>)` to a specific header (`<th />`) and a "label" which is the display name of the header.
   */
  headers: Header[];
  /**
   * An array of objects to be displayed as rows. The available keys are `cssClass`, `figmaToken`, `example`, and `usage`. The `example` and `usage` keys can be a string or an object with keys that match a DS theme that pertain a string specific to that theme. If the `example` value for a theme is `null`, it will render a badge indicating that the class is not used by that theme. If the `example` value is `example-link`, it will render a link.
   */
  data: DataItem[];
  /**
   * One of the available design system themes (e.g. healthcare).
   */
  theme: ThemeName;
}

const DEFAULT_EXAMPLE_TEXT = 'Tuscaloosa';

const UnusedBadge = ({ theme }: { theme: ThemeName }) => {
  const displayName = capitalize(theme);

  return (
    <Badge variation="alert">
      <CloseIconThin /> Unused by {displayName}.
    </Badge>
  );
};

const DynamicTableCell = ({
  dataItem,
  header,
  theme,
}: {
  dataItem: DataItem;
  header: Header;
  theme: ThemeName;
}) => {
  const { dataKey, label } = header;
  const value = dataItem[dataKey];
  const data = typeof value === 'object' ? value[theme] : value;
  let content: React.ReactNode;

  const isCSSClass = dataKey === 'cssClass';
  const isExample = dataKey === 'example';
  const isNotUsedByTheme = isExample && data === null;
  const isExampleLink = isExample && data === 'example-link';

  if (isNotUsedByTheme) {
    content = <UnusedBadge theme={theme} />;
  } else if (isExampleLink) {
    content = (
      <a href={`#${dataItem.cssClass}`} className={dataItem.cssClass}>
        {DEFAULT_EXAMPLE_TEXT}
      </a>
    );
  } else if (isExample) {
    content = <span className={dataItem.cssClass}>{data ?? DEFAULT_EXAMPLE_TEXT}</span>;
  } else if (isCSSClass) {
    content = <code>{data}</code>;
  }

  return (
    <TableCell headers={dataKey} stackedTitle={label} align={isExample ? 'right' : null}>
      {content}
    </TableCell>
  );
};

const TypographyUsageTable = ({ caption, data, headers, theme }: TypographyProps) => {
  // core should not display 'usage' column
  const filteredHeaders =
    theme === 'core' ? headers.filter(({ dataKey }) => dataKey !== 'usage') : headers;

  return (
    <Table
      className="c-typography-usage-table ds-u-margin-bottom--2"
      compact
      stackable
      stackableBreakpoint="lg"
      scrollable
    >
      <TableCaption>{caption}</TableCaption>
      <TableHead>
        <TableRow>
          {filteredHeaders.map(({ dataKey, label }) => (
            <TableCell key={dataKey} id={dataKey} align={dataKey === 'example' ? 'right' : null}>
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((dataItem) => (
          <TableRow key={dataItem.figmaToken}>
            {filteredHeaders.map((header) => (
              <DynamicTableCell
                key={header.dataKey}
                header={header}
                dataItem={dataItem}
                theme={theme}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TypographyUsageTable;
