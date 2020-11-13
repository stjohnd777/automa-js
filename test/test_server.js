
 function start (){

    const http = require('http');
    const express = require('express');
    const app = express();
    let path = require('path');
    let cookieParser = require('cookie-parser');
    let logger = require('morgan');

    let dirView = __dirname;
    let viewHome = path.join(dirView, 'views');
    app.set('views',viewHome);

    app.set('view engine', 'ejs');
    app.use(logger('dev'));


    let static_path = path.join(__dirname, '../public')
    app.use(express.static(static_path) );

    let router = express.Router();
    router.get('/', function(req, res, next) {
        res.render('test_index', { title: 'Express' });
    });
    app.use(router);


    const hostname = '127.0.0.1';
    const port = 8989;
    const server = http.createServer(app);
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    })
}

start()
