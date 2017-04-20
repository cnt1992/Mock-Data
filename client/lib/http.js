'use strict';

const http = require('http');
const querystring = require('querystring');

module.exports = exports = {
    /**
     * 发送数据请求
     */
    post: (data, options) => {
        options = Object.assign({}, options, {
            headers: Object.assign({}, options.headers, {
                'Content-Length': Buffer.byteLength(data)
            })
        });
        
        return new Promise((resolve, reject) => {
            const req = http.request(options, res => {
                res.setEncoding('utf8');
                res.on('data', chunk => {
                    resolve(chunk);
                });
                res.on('end', () => {                
                });
            });

            req.on('error', e => {                
                console.error(`problem with request: ${e.message}`);
                reject(e.message);
            });

            req.write(data);
            req.end();
        });        
    }
}