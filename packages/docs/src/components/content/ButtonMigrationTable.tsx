import {
  Badge,
  Button,
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@cmsgov/design-system';
import ThemeContent from './ThemeContent';

export interface ButtonMigrationTableProps {
  /**
   * Name of currently selected theme
   */
  theme: string;
}

const ButtonMigrationTable = ({ theme }: ButtonMigrationTableProps) => {
  const deprecated = <Badge variation="alert">Deprecated</Badge>;
  const noChange = <Badge>No change</Badge>;

  return (
    <>
      <Table stackable stackableBreakpoint="md" className="c-button-migration-table">
        <TableCaption>Mapping old button React code to new</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell scope="col" id="looked-like">
              Looked like
            </TableCell>
            <TableCell scope="col" id="old-react">
              Old React
            </TableCell>
            <TableCell scope="col" id="new-react">
              New React
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell headers="looked-like" stackedTitle="Looked Like">
              <Button>Default</Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              {noChange}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like" stackedTitle="Looked Like">
              <Button variation="solid">Primary</Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="primary"...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <code>{'<Button variation="solid"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like" stackedTitle="Looked Like">
              <Button variation="solid" isAlternate>
                Secondary
              </Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="secondary"...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="solid" isAlternate...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                <>{deprecated} - Consider using outline (default) variation</>
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like" stackedTitle="Looked Like">
              <Button variation="ghost">Transparent</Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="transparent"...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <code>{'<Button variation="ghost"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like" stackedTitle="Looked Like">
              [Success]
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="success"...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <>{deprecated} - Consider using solid variation</>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like" stackedTitle="Looked Like">
              [Danger]
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="danger"...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              {deprecated}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like"
              stackedTitle="Looked Like"
              className="ds-base--inverse"
            >
              <Button onDark>Inverse default</Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button inverse...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <ThemeContent theme={theme} neverThemes={['healthcare', 'medicare']}>
                <code>{'<Button onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare', 'medicare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like"
              stackedTitle="Looked Like"
              className="ds-base--inverse"
            >
              <Button variation="solid" onDark>
                Inverse primary
              </Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="primary" inverse...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="solid" onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like"
              stackedTitle="Looked Like"
              className="ds-base--inverse"
            >
              <Button variation="solid" isAlternate onDark>
                Inverse secondary
              </Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="secondary" inverse...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="solid" isAlternate onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like"
              stackedTitle="Looked Like"
              className="ds-base--inverse"
            >
              <Button variation="ghost" onDark>
                Inverse transparent
              </Button>
            </TableCell>
            <TableCell headers="old-react" stackedTitle="Old React">
              <code>{'<Button variation="transparent" inverse...'}</code>
            </TableCell>
            <TableCell headers="new-react" stackedTitle="New React">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="ghost" onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table stackable stackableBreakpoint="md" className="c-button-migration-table">
        <TableCaption>Mapping old button HTML to new</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell scope="col" id="looked-like-2">
              Looked like
            </TableCell>
            <TableCell scope="col" id="old-html">
              Old HTML
            </TableCell>
            <TableCell scope="col" id="new-html">
              New HTML
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell headers="looked-like-2" stackedTitle="Looked like">
              <Button>Default</Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button"...'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              {noChange}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like-2" stackedTitle="Looked like">
              <Button variation="solid">Primary</Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button ds-c-button--primary"...'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <code>{'<button class="ds-c-button ds-c-button--solid"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like-2" stackedTitle="Looked like">
              <Button variation="solid" isAlternate>
                Secondary
              </Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button ds-c-button--secondary"...'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>
                  {'<button class="ds-c-button ds-c-button--solid ds-c-button--alternate"...'}
                </code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                <>{deprecated} - Consider using outline (default) variation</>
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like-2" stackedTitle="Looked like">
              <Button variation="ghost">Transparent</Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button ds-c-button--transparent...'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <code>{'<button class="ds-c-button ds-c-button--ghost"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like-2" stackedTitle="Looked like">
              [Success]
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button ds-c-button--success...'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <>{deprecated} - Consider using solid variation</>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell headers="looked-like-2" stackedTitle="Looked like">
              [Danger]
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button ds-c-button--danger...'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              {deprecated}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like-2"
              stackedTitle="Looked like"
              className="ds-base--inverse"
            >
              <Button onDark>Inverse default</Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>{'<button class="ds-c-button ds-c-button--inverse"'}</code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <ThemeContent theme={theme} neverThemes={['healthcare', 'medicare']}>
                <code>{'<button class="ds-c-button ds-c-button--on-dark"...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare', 'medicare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like-2"
              stackedTitle="Looked like"
              className="ds-base--inverse"
            >
              <Button variation="solid" onDark>
                Inverse primary
              </Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>
                {'<button class="ds-c-button ds-c-button--primary ds-c-button--inverse"...'}
              </code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>
                  {'<button class="ds-c-button ds-c-button--solid ds-c-button--on-dark"...'}
                </code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like-2"
              stackedTitle="Looked like"
              className="ds-base--inverse"
            >
              <Button variation="solid" isAlternate onDark>
                Inverse secondary
              </Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>
                {'<button class="ds-c-button ds-c-button--secondary ds-c-button--inverse"...'}
              </code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>
                  {
                    '<button class="ds-c-button ds-c-button--solid ds-c-button--alternate ds-c-button--on-dark"...'
                  }
                </code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              headers="looked-like-2"
              stackedTitle="Looked like"
              className="ds-base--inverse"
            >
              <Button variation="ghost" onDark>
                Inverse transparent
              </Button>
            </TableCell>
            <TableCell headers="old-html" stackedTitle="Old HTML">
              <code>
                {'<button class="ds-c-button ds-c-button--transparent ds-c-button--inverse...'}
              </code>
            </TableCell>
            <TableCell headers="new-html" stackedTitle="New HTML">
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>
                  {'<button class="ds-c-button ds-c-button--ghost ds-c-button--on-dark"...'}
                </code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ButtonMigrationTable;
