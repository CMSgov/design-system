const ROOT_URL = 'http://localhost:3001/iframe.html?viewMode=story&id=';
const RULESET_ALL = ['section508', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const RULESET_BEST_PRACTICE = ['best-practice'];
const RULESET_WCAG_TWO = ['section508', 'wcag2a', 'wcag2aa'];
const RULESET_508 = ['section508'];
const WAIT_UNTIL_TIME = 30000;

module.exports = {
  ROOT_URL,
  RULESET_ALL,
  RULESET_BEST_PRACTICE,
  RULESET_WCAG_TWO,
  RULESET_508,
  WAIT_UNTIL_TIME,
};
