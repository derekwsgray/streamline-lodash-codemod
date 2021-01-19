const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);
  const options = getOptions();

  const quoteOption = options.quote ? options.quote : 'single';

  // Cache opening comments/position
  const { comments, loc } = root.find(j.Program).get('body', 0).node;

  // Remove lodash import
  const lodashImportDeclarations = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'lodash'
    }
  });
  if (lodashImportDeclarations.length === 0) {
    return file.source;
  }

  const lodashLocalName = lodashImportDeclarations.find(j.Identifier).get(0).node.name; // Use the local name (usually "_", but just in case.)

  const needImporting = [];

  root
    .find(j.MemberExpression, {
      object: {
        type: 'Identifier',
        name: lodashLocalName // Just look for expressions using `_.something()`
      }
    })
    .replaceWith((nodePath) => {
      const { node } = nodePath;
      const lodashFnName = node.property.name;

      if (!needImporting.includes(lodashFnName)) {
        // See if we already have this imported yet
        const preExistingImports = root.find(j.ImportDeclaration, {
          source: {
            type: 'Literal',
            value: `lodash/${lodashFnName}`
          }
        });
        if (preExistingImports.length === 0) {
          needImporting.push(lodashFnName);
        }
      }

      // Replace the MemberExpression with an Identifier(_.isNil ===> isNil)
      return j.identifier(lodashFnName);
    });

  // Build up a collection of new import declarations
  const newImportDeclarations = needImporting.map((lodashFnName) => {
    return j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(lodashFnName))],
      j.literal(`lodash/${lodashFnName}`)
    );
  });

  lodashImportDeclarations.insertAfter(newImportDeclarations);
  lodashImportDeclarations.remove();

  // Restore opening comments/position
  Object.assign(root.find(j.Program).get('body', 0).node, { comments, loc });

  return root.toSource({ quote: quoteOption });
};

module.exports.type = 'js';
