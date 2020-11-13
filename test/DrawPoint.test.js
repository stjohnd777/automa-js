const assert = require('assert'),
     expect = require('chai').expect,
     should = require('chai').should();

beforeAll (function(){

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


    app.use(express.static(path.join(__dirname, '../public')));

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
})

afterAll(() => {

});


test('ComputeNeighbors dim 3 len 12 topology T2', () => {


})