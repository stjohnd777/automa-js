/**
 * Created by Daniel St John on 4/2/17.
 * Start Up Again 3/4/20 : DSJ
 */
const http = require('http');
const express = require('express');

const app = express();
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
app.use(router);

const loginRoute = require('./routs/loginRoute');
app.use(loginRoute);

const hostname = '127.0.0.1';
const port = 7767;
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});