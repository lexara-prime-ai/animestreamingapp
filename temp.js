const log = console.log;
const fs = require('fs');
const path = require('path');
const http = require('http');
const server = http.createServer;
const HOST = 'http://localhost';
const PORT = 3000;

server((req, res) => {
    log(req.url);
    let file_ext = path.extname(req.url), content_type;
    switch (file_ext) {
        case '.css':
            content_type = 'text/css'
            break;
        case '.mp4':
            content_type = 'video/mp4'
            break;
        case '.jpg':
            content_type = 'image/jpeg'
            break;
        case '.txt':
            content_type = 'text/plain'
            break;

        default:
            content_type = 'text/html'
    }
    let filepath;
    if (content_type === 'text/html' && req.url === '/') {
        filepath = path.join(__dirname, 'player.html');
    } else {
        filepath = path.join(__dirname, req.url);
    }
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) log(err.name, err.message);
        res.writeHead(200, { 'Content-Type': content_type });
        res.end(data);
    })

    if (req.url === '/videos') {
        filepath = path.join(__dirname, 'videos', req.url)   ;
        fs.readFile(filepath, (err, data) => {
            if (err) log(err.name, err.message);
            res.writeHead(206, { 
                'Content-Type': content_type,
                'Accept-Ranges': 'bytes'
         });
         res.end(data);
        })
       
    }


}).listen(PORT, () => log(`Server is running on host: ${HOST}:${PORT}`));
