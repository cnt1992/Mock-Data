'use strict';

const path = require('path');

const root = path.dirname(require.main.filename);
const dataPath = path.join(root, 'data/');

module.exports = exports = {
    root: root,
    port: 9090,
    dataPath: dataPath
}