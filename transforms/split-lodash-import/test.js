'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({
  name: 'split-lodash-import'
});
