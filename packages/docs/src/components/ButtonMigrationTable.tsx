import React from 'react';
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
            <TableCell scope="col">Looked like</TableCell>
            <TableCell scope="col">Old React</TableCell>
            <TableCell scope="col">New React</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button>Default</Button>
            </TableCell>
            <TableCell>
              <code>{'<Button...'}</code>
            </TableCell>
            <TableCell>{noChange}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="solid">Primary</Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="primary"...'}</code>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="solid"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="solid" isAlternate>
                Secondary
              </Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="secondary"...'}</code>
            </TableCell>
            <TableCell>
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="solid" isAlternate...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="ghost">Transparent</Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="transparent"...'}</code>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="ghost"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>[Success]</TableCell>
            <TableCell>
              <code>{'<Button variation="success"...'}</code>
            </TableCell>
            <TableCell>{deprecated}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>[Danger]</TableCell>
            <TableCell>
              <code>{'<Button variation="danger"...'}</code>
            </TableCell>
            <TableCell>{deprecated}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ds-base--inverse">
              <Button onDark>Inverse default</Button>
            </TableCell>
            <TableCell>
              <code>{'<Button inverse...'}</code>
            </TableCell>
            <TableCell>
              <ThemeContent theme={theme} neverThemes={['healthcare', 'medicare']}>
                <code>{'<Button onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare', 'medicare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ds-base--inverse">
              <Button variation="solid" onDark>
                Inverse primary
              </Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="primary" inverse...'}</code>
            </TableCell>
            <TableCell>
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="solid" onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ds-base--inverse">
              <Button variation="solid" isAlternate onDark>
                Inverse secondary
              </Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="secondary" inverse...'}</code>
            </TableCell>
            <TableCell>
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>{'<Button variation="solid" isAlternate onDark...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ds-base--inverse">
              <Button variation="ghost" onDark>
                Inverse transparent
              </Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="transparent" inverse...'}</code>
            </TableCell>
            <TableCell>
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
            <TableCell scope="col">Looked like</TableCell>
            <TableCell scope="col">Old HTML</TableCell>
            <TableCell scope="col">New HTML</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button>Default</Button>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button"...'}</code>
            </TableCell>
            <TableCell>{noChange}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="solid">Primary</Button>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--primary"...'}</code>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--solid"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="solid" isAlternate>
                Secondary
              </Button>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--secondary"...'}</code>
            </TableCell>
            <TableCell>
              <ThemeContent theme={theme} neverThemes={['healthcare']}>
                <code>
                  {'<button class="ds-c-button ds-c-button--solid ds-c-button--alternate"...'}
                </code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="ghost">Transparent</Button>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--transparent...'}</code>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--ghost"...'}</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>[Success]</TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--success...'}</code>
            </TableCell>
            <TableCell>{deprecated}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>[Danger]</TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--danger...'}</code>
            </TableCell>
            <TableCell>{deprecated}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ds-base--inverse">
              <Button onDark>Inverse default</Button>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--inverse"'}</code>
            </TableCell>
            <TableCell>
              <ThemeContent theme={theme} neverThemes={['healthcare', 'medicare']}>
                <code>{'<button class="ds-c-button ds-c-button--on-dark"...'}</code>
              </ThemeContent>
              <ThemeContent theme={theme} onlyThemes={['healthcare', 'medicare']}>
                {deprecated}
              </ThemeContent>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ds-base--inverse">
              <Button variation="solid" onDark>
                Inverse primary
              </Button>
            </TableCell>
            <TableCell>
              <code>
                {'<button class="ds-c-button ds-c-button--primary ds-c-button--inverse"...'}
              </code>
            </TableCell>
            <TableCell>
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
            <TableCell className="ds-base--inverse">
              <Button variation="solid" isAlternate onDark>
                Inverse secondary
              </Button>
            </TableCell>
            <TableCell>
              <code>
                {'<button class="ds-c-button ds-c-button--secondary ds-c-button--inverse"...'}
              </code>
            </TableCell>
            <TableCell>
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
            <TableCell className="ds-base--inverse">
              <Button variation="ghost" onDark>
                Inverse transparent
              </Button>
            </TableCell>
            <TableCell>
              <code>
                {'<button class="ds-c-button ds-c-button--transparent ds-c-button--inverse...'}
              </code>
            </TableCell>
            <TableCell>
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
