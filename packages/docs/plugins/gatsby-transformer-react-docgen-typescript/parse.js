// import { handlers, parse, resolver } from "react-docgen"
// import { ERROR_MISSING_DEFINITION } from "react-docgen/dist/parse"
// import { codeFrameColumns } from "@babel/code-frame"
// import { createDisplayNameHandler } from "./displayname-handler"
// import { applyPropDoclets, cleanDoclets, parseDoclets } from "./doclets"
// import docgen from "react-docgen-typescript";

const docgen = require('react-docgen-typescript');
const path = require('path');
const { ERROR_MISSING_DEFINITION } = require('react-docgen/dist/parse');
const { codeFrameColumns } = require('@babel/code-frame');
const { createDisplayNameHandler } = require('./displayname-handler');
const { applyPropDoclets, cleanDoclets, parseDoclets } = require('./doclets');

console.log(`cwd: ${process.cwd()}`);

// Create a parser with the default typescript config and custom docgen options
const customParser = docgen.withCustomConfig('../../tsconfig.json', {
  savePropValueAsString: true,
  propFilter: (prop, component) => {
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
        return !declaration.fileName.includes('node_modules');
      });

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
});

function parseMetadata(content, node, options) {
  console.log(node.absolutePath);
  const docs = customParser.parse(path.relative('../../tsconfig.json', node.absolutePath));

  console.log(docs);

  let components = [];
  // const { handlers, resolver: userResolver, ...parseOptions } = options || {}
  // try {
  //   components = parse(
  //     content,
  //     userResolver || resolver.findAllComponentDefinitions,
  //     makeHandlers(node, handlers).concat(defaultHandlers),
  //     {
  //       ...parseOptions,
  //       filename: node.absolutePath,
  //     }
  //   )
  // } catch (err) {
  //   if (err.message === ERROR_MISSING_DEFINITION) return []
  //   // reset the stack to here since it's not helpful to see all the react-docgen guts
  //   // const parseErr = new Error(err.message)
  //   if (err.loc) {
  //     err.codeFrame = codeFrameColumns(
  //       content,
  //       err.loc.start || { start: err.loc },
  //       {
  //         highlightCode: true,
  //       }
  //     )
  //   }
  //   throw err
  // }

  if (components.length === 1) {
    components[0].displayName = components[0].displayName.replace(/\d+$/, ``);
  }

  components.forEach((component) => {
    component.docblock = component.description || ``;
    component.doclets = parseDoclets(component);
    component.description = cleanDoclets(component.description);

    component.props = Object.keys(component.props || {}).map((propName) => {
      const prop = component.props[propName];
      prop.name = propName;
      prop.docblock = prop.description || ``;
      prop.doclets = parseDoclets(prop, propName);
      prop.description = cleanDoclets(prop.description);

      applyPropDoclets(prop);
      return prop;
    });
  });

  return components;
}

exports.default = parseMetadata;
