export const ROOT = 'http://localhost:3001';
export const timeout = process.env.SLOW_MO
  ? 20000 + parseInt(process.env.SLOW_MO, 10) * 10
  : 15000;

export function newPage() {
  return global.browser.newPage();
}

export function gotoPath(page, path) {
  return page.goto(`${ROOT}/${path}`);
}

export function gotoExample(page, path) {
  return gotoPath(page, `example/${path}`);
}
