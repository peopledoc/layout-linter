export default (node, attributes) => {
  if (!Array.isArray(attributes)) {
    attributes = new Array(attributes);
  }
  return attributes.every((attribute) => node.attr(attribute) !== undefined);
};
