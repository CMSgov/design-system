/**
 * Infer the displayName of a component.
 * Credit: github.com/nerdlabs/react-docgen-displayname-handler
 *
 * TODO(sawyer): Separate this out into its own package. It could be just a fork
 * of nerdlabs/react-docgen-displayname-handler if necessary, though I couldn't
 * get that to actually work (maybe compatibility issues w/ a newer version?)
 */
const DEFAULT_NAME = 'UnknownComponent';
const { getMemberValuePath, getNameOrValue } = require('react-docgen').utils;
const recast = require('recast');
const { types: { namedTypes: types } } = recast;

function getStaticDisplayName(path) {
  let displayName = null;
  const staticMember = getMemberValuePath(path, 'displayName');

  if (staticMember && types.Literal.check(staticMember.node)) {
    displayName = getNameOrValue(staticMember);
  }

  return displayName;
}

function getNodeIdentifier(path) {
  let displayName = null;

  if (
    types.FunctionExpression.check(path.node) ||
    types.FunctionDeclaration.check(path.node) ||
    types.ClassExpression.check(path.node) ||
    types.ClassDeclaration.check(path.node)
  ) {
    displayName = getNameOrValue(path.get('id'));
  }

  return displayName || null;
}

function displayNameHandler(documentation, path) {
  const displayName = [getStaticDisplayName, getNodeIdentifier].reduce(
    (name, getDisplayName) => name || getDisplayName(path),
    ''
  );

  documentation.set('displayName', displayName || DEFAULT_NAME);
}

module.exports = displayNameHandler;
