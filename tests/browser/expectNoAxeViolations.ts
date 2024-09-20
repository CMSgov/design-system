import AxeBuilder from '@axe-core/playwright';
import chalk from 'chalk';
import { AxeResults, Result } from 'axe-core';
import { Page, expect } from '@playwright/test';

const RULESET_ALL = ['section508', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const DISABLED_RULES = ['bypass'];

function impactColor(impact) {
  switch (impact) {
    case 'critical':
    case 'serious':
      return chalk.redBright;
    case 'moderate':
    default:
      return chalk.yellowBright;
  }
}

function formatLine(line = '', indentation = 4) {
  return ' '.repeat(indentation) + line + '\n';
}

function createViolationMessage({ id, impact, nodes, ...rest }: Result) {
  let message = '';
  const color = impactColor(impact);
  message += formatLine(color(`● ${id} (${impact})`));
  Object.keys(rest).forEach((key) => {
    message += formatLine(`${key}: ${rest[key]}`, 6);
  });
  message += formatLine('nodes:', 6);
  message += formatLine();
  nodes.forEach(({ failureSummary, ...rest }) => {
    message += formatLine(`● ${failureSummary}`, 6);
    Object.keys(rest).forEach((key) => {
      message += formatLine(`${key}: ${rest[key]}`, 8);
    });
    message += formatLine();
  });
  return message;
}

function createErrorMessage(violations: AxeResults['violations']): string {
  let message = '';
  message += formatLine(chalk.bgRed.bold('  Accessibility violations:  '), 0);
  message += '\n';
  message += violations.map(createViolationMessage).join('');
  return message;
}

export default async function expectNoAxeViolations(page: Page, shouldUseAxeLegacyMode: boolean) {
  const results = await new AxeBuilder({ page })
    .setLegacyMode(shouldUseAxeLegacyMode)
    .withTags(RULESET_ALL)
    .disableRules(DISABLED_RULES)
    .analyze();
  // Disable Jest linting rule because it isn't Jest!
  // eslint-disable-next-line jest/valid-expect
  expect(results?.violations.length, createErrorMessage(results.violations)).toBe(0);
}
