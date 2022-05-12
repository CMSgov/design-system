import { FileDescriptor } from './types';
import { flatten, writeFile } from './utility';

/*
 * Sets up a list of key/pair values from an object (section) using a formatter
 * function which returns an interpolated string value for use in new sass file
 */
const writeToken = (
  items: Record<string, any>,
  section: string,
  formatter: (name: string, value: string) => string,
  separator: string
) => {
  let vars = '';
  Object.entries(items).forEach(([name, value]) => {
    // global objects in themes are not prefixed by the token type
    name = section === 'global' ? name : `${section}${separator}${name}`;
    vars += formatter(name, value);
  });
  return vars;
};

export const exportScss = (fileDescriptors: FileDescriptor[], outPath: string): number => {
  let tokenItems =  {}
  let filename = ''
  let tokenOutput = ''

  fileDescriptors.forEach((file) => {
    const importedModule = require(`${file.moduleImportName}`)
    const sep = file.baseName.includes('components') ? '' : '-'
    let output = '' 

    if (file.parentDirectoryName.includes('tokens')) {
      filename = `${outPath}/cmsds.tokens.scss`
      const tokens = flatten(importedModule.default);
      console.log(JSON.stringify(tokens,null,4))
      tokenOutput += writeToken(tokens, file.baseName, (n, v) => `$${n}: ${v};\n`, sep);
    } else {
      filename = `${outPath}/${file.baseName}-theme.scss`

      Object.entries(importedModule.default).forEach(([section]) => {
          tokenItems = flatten(importedModule.default[section]);
        /*
         * core theme scss needs the !default attribute added to every style
         * to allow for overriding in medicare, TODO: get all systems on the
         * same page and remove this
         */
        if (file.baseName.includes('core')) {
          output += writeToken(tokenItems, section, (n, v) => `$${n}: ${v} !default;\n`, sep);
        } else {
          output += writeToken(tokenItems, section, (n, v) => `$${n}: ${v};\n`, sep);
        }
      })

      writeFile(filename, output)
    }
  })

  if (fileDescriptors[0].parentDirectoryName.includes('tokens')) {
    writeFile(filename, tokenOutput)
  }

  return 0
}

export default exportScss;
