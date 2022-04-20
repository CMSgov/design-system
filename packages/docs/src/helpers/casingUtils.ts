/**
 * toKebabCase
 * @param currentText takes a string that is English cased
 * @returns the same text in kebab case
 * @see https://javascript.plainenglish.io/convert-string-to-different-case-styles-snake-kebab-camel-and-pascal-case-in-javascript-da724b7220d7
 * for implementation
 */
export const toKebabCase = (currentText: string) => {
  if (currentText) {
    return currentText
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.toLowerCase())
      .join('-');
  }
  return currentText;
};
