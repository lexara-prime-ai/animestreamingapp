// require('dotenv').config();
const log = console.log;
// const logger = require('./logger');
const fs = require('fs');
const path = require('path');
const http = require('http');
const server = http.createServer;
const HOST = 'http://localhost';
const PORT = 3000;
// const EventEmitter = require('events');
// const Emitter = new EventEmitter();
// Emitter.on('log', (message, file_name) => logger(message, file_name));
server((req, res) => {
    // Emitter.emit('log', `${req.url}\t${req.method}`, 'request_log.log');
    const file_ext = path.extname(req.url);
    let content_type, file_path;
    if (file_ext === '.css') {
        content_type = 'text/css';
    } else if (file_ext === '.js') {
        content_type = 'text/javascript';
    } else if (file_ext === '.json') {
        content_type = 'application/javascript';
    } else if (file_ext === '.jpg') {
        content_type = 'image/jpeg';
    } else if (file_ext === '.png') {
        content_type = 'image/png';
    } else if (file_ext === '.gif') {
        content_type = 'image/gif';
    } else if (file_ext === '.mp4') {
        content_type = 'video/mp4';
    } else if (file_ext === '.txt') {
        content_type = 'text/plain';
    } else {
        content_type = 'text/html';
    }
    if (content_type === 'text/html' && req.url === '/') {
        file_path = path.join(__dirname, 'views', 'index.html');
    } else if (content_type === 'text/html' && req.url.slice(-1) === '/') {
        file_path = path.join(__dirname, 'views', req.url, 'index.html');
    } else if (content_type === 'text/html') {
        file_path = path.join(__dirname, 'views', req.url, 'index.html');
    } else {
        file_path = path.join(__dirname, req.url);
    }
    if (!file_ext && req.url.slice(-1) !== '/') file_path += '.html';
    // FILE CHECK
    if (fs.existsSync(file_path)) {
        // IMAGES
        if (!content_type.includes('image')) {
            fs.readFile(file_path, 'utf-8', (err, data) => {
                if (err) log(err.name, err.message);
                res.writeHead(200, { 'Content-Type': content_type });
                res.end(data);
                return;
            });
        } else {
            fs.readFile(file_path, '', (err, data) => {
                if (err) log(err.name, err.message);
                res.writeHead(200, { 'Content-Type': content_type });
                res.end(data);
                return;
            });
        } 
        // VIDEOS
        if (content_type.includes('video')) {
            fs.readFile(file_path, (err, data) => {
                if (err) log(err.name, err.message);
                res.writeHead(206, { 'Content-Type': 'video/mp4' });
                res.end(data);
                return;  
            });
        }  
    } else {
        fs.readFile(path.join(__dirname, 'views', '404.html'), 'utf-8', (err, data) => {
            if (err) log(err.name, err.message);
            res.writeHead(200, { 'Content-Type': content_type });
            res.end(data);
            return; 
        });
    }
}).listen(PORT, () => log(`Server is running on host: ${HOST}:${PORT}`));




