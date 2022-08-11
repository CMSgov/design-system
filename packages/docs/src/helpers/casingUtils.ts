/**
 * toKebabCase
 * @param currentText takes a string that is English cased
 * @returns the same text in kebab case
 * @see https://javascript.plainenglish.io/convert-string-to-different-case-styles-snake-kebab-camel-and-pascal-case-in-javascript-da724b7220d7
 * for implementation
 */
export const toKebabCase = (currentText: string) => {
  if (currentText && typeof currentText === 'string') {
    return currentText
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.toLowerCase())
      .join('-');
  }
  return currentText;
};

/**
 * toLowerCaseOneWord - needed to match graphql's heading urls
 * @param currentText takes a string that is English cased
 * @returns the same text with all letters lowercase and a single word without breaks
 *
 */
export const toLowerCaseOneWord = (currentText: string) => {
  if (currentText && typeof currentText === 'string') {
    return currentText
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.toLowerCase())
      .join('');
  }
  return currentText;
};

export const removePositioning = (text: string): string => {
  return text.replace(/\d+_/g, '');
};
