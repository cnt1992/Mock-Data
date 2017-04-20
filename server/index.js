'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

const FS = require('./libs/fs');
const {port, dataPath} = require('./config/config');

/**
 * init data path , if the path don't exists then create it
 * @param {String} path dataPath
 */
function initDataPath(dataPath) {
    try {
        const stat = fs.statSync(dataPath);
    } catch (e) {
        fs.mkdirSync(dataPath);
    }    
}

// initDataPath(config.dataPath);

/**
 * read the file content if dataPath exists, else return empty object string
 * @param {String} dataPath 
 */
function getData(dataPath) {
    let data = '{}';
    try {
        data = fs.readFileSync(path.join('..', dataPath), {
            encoding: 'utf-8'
        });
    } catch (e) {} finally {
        return data;
    }    
}

const app = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url);
    const reqMethod = req.method.toUpperCase();
    const isJson = /(.json)$/.test(reqUrl.path);

    // CORS setting
    const corsResHeaders = {  
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, OPTIONS",
        "access-control-allow-headers": "content-type, accept",
        "access-control-max-age": 10,
        "Content-Type": "application/json"
    };

    if (reqMethod == 'OPTIONS') {
        res.writeHead(200, corsResHeaders);
        res.end();
    }

    if (reqUrl.path === '/upload') {
        let _data ='';
        req.addListener('data', chunk => {  
            _data += chunk;  
        }).addListener('end', () => {
            FS.create(req.headers.filepath, _data, req.headers.force).then((_res, err) => {
                res.end(JSON.stringify(_res));
            });            
        });      
    } else if (['GET', 'POST'].indexOf(reqMethod) > -1 && isJson) {
        const result = FS.read(reqUrl.path);

        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            "Content-Length": Buffer.byteLength(result, 'utf8')
        });
        res.end(result);
    } else {
        res.end(JSON.stringify({
            success: false,
            errorMsg: "not found"
        }));
    }    
});

app.listen(port, () => {
    console.info('Server is listening at port: %s', port);
});