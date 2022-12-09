const { onCreateNode, shouldOnCreateNode } = require(`./on-node-create`);

exports.unstable_shouldOnCreateNode = shouldOnCreateNode;
exports.onCreateNode = onCreateNode;
exports.setFieldsOnGraphQLNodeType = require(`./extend-node-type`).default;
