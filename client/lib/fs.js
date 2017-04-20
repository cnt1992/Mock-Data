'use strict';

const fs = require('fs');

module.exports = exports = {
    readFile: filePath => {
        return new Promise((resolve, reject) => {
            try {
                let content = fs.readFileSync(filePath, {
                    encoding: 'utf-8'
                });
                resolve(content);
            } catch (e) {
                reject(e);
            }
        })
    }
};