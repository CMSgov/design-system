const docgen = require("react-docgen-typescript");
const fs = require("fs");

// Create a parser with the default typescript config and custom docgen options
const customParser = docgen.withCustomConfig("./tsconfig.json", {
  savePropValueAsString: true,
  propFilter: (prop, component) => {
    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
        return !declaration.fileName.includes("node_modules");
      });

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
});

const docs = customParser.parse("packages/design-system/src/components/ChoiceList/ChoiceList.tsx");

// console.log(docs)

fs.writeFileSync("type-data.json", JSON.stringify(docs, null, 2))