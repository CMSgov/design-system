import { shV } from './utils';

const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

shV('npm run apply-example-templates');

shV('npm --prefix ./examples/astro run build --base /astro/dist');
shV('npm --prefix ./examples/preact-app run build');
shV('npm --prefix ./examples/preact-react-app run build');
shV('npm --prefix ./examples/react-app run build');

if (!isSmokeTest) {
  shV('npm --prefix ./examples/astro-themes run build --base /astro-themes/dist');
}
