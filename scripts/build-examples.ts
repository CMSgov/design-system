import { shV } from './utils';

const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

shV('yarn apply-example-templates');

shV('yarn --cwd ./examples/astro build --base /astro/dist');
shV('yarn --cwd ./examples/preact-app build');
shV('yarn --cwd ./examples/preact-react-app build');
shV('yarn --cwd ./examples/react-app build');

if (!isSmokeTest) {
  shV('yarn --cwd ./examples/astro-themes build --base /astro-themes/dist');
}
