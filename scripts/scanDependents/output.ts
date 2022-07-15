import Table from 'cli-table3';
import chalk from 'chalk';

export interface OutputTable {
  title: string;
  head: string[];
  rows: string[][];
}

export function printTable(table: OutputTable) {
  const cliTable = new Table({ head: table.head });
  table.rows.forEach((row) => cliTable.push(row));

  console.log('');
  console.log(chalk.cyan(table.title));
  console.log(cliTable.toString());
}

export function printCsv(table: OutputTable) {
  // TODO: Implement when needed
}

export function writeCsv(table: OutputTable) {
  // TODO: Implement when needed
}
