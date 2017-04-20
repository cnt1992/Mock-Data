/**
 * CURD Actions
 */
'use strict';

const fs = require('fs');
const path = require('path');
const config = require('../config/config');

const { root } = config;

module.exports = exports = {
    create: (_path, data, force) => {
        let oldPath = _path;
        _path = path.join(root, 'data',  _path);
        return new Promise((resolve, reject) => {
            if (fs.existsSync(_path)) {
                resolve({
                    success: false,
                    errorMsg: 'file has exists'
                })
            } else {
                fs.appendFileSync(_path, data, {
                    encoding: 'utf8',
                    flag: 'w'
                });
                resolve({
                    success: true,
                    data: {
                        filePath: '/data/' + oldPath
                    }                    
                });
            }
            
        });        
    },
    read: _path => {
        _path = path.join(root, _path);
        try {
            return fs.readFileSync(_path, {
                encoding: 'utf-8'
            });
        } catch (e) {
            throw new Error(e);
        }
    },
    update: (_path, data) => {

    }
}