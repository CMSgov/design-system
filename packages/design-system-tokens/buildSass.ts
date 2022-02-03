// import * as fs from 'fs';
import * as u from './lib/utility';

// const buildThemeSass = async (themeModule: string, outputPath: string) => {
//   await u.loadTheme(themeModule).then((theme) => {
//     Object.keys(theme.tokens).forEach((k) => {
//       const fn = `${outputPath}/${theme.name}-${k}.scss`;
//       let vars = '';

//       Object.entries(theme.tokens[k]).forEach(([t, v]) => {
//         vars += `$${t}: ${v};\n`;
//       });

//       try {
//         fs.writeFileSync(fn, vars);
//         console.log(`:: wrote ${fn}`);
//       } catch (err) {
//         console.error(`There was an issue writing to ${fn}: ${err}`);
//       }
//     });
//   });
// };

const buildAllThemeSass = (outputPath: string) => {
  const af = u.getAllFiles('./brands/', []);
  af.forEach((themeModule) => {
    // buildThemeSass(themeModule, outputPath);
    console.log(`${outputPath} ${themeModule}`);
  });
};

// const buildTokenSass = (tokenModule: string, outputPath: string) => {
//   console.log(`${outputPath} ${tokenModule}`);
// }

const buildAllTokenSass = (outputPath: string) => {
  const af = u.getAllFiles('./tokens/', []);
  af.forEach((tokenModule) => {
    console.log(`${outputPath} ${tokenModule}`);
  });
};

export const buildSass = {
  tokens: buildAllTokenSass,
  themes: buildAllThemeSass,
};

export default buildSass;
