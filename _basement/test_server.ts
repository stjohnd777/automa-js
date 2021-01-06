
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

function Endpoint(method,uri,handler) {
   this.method = method;
   this.uri = uri ;
   this.handler = handler ;
}

function createServer(  endpoints ){

   const http = require('http');
   const express = require('express');
   const app = express();
   const server = http.createServer(app);
   let router = express.Router();

   endpoints.forEach ( endpoint=>{
      switch (endpoint.method) {
         case 'GET':
            router.get(endpoint.uri, function(req, res, next) {
               res.render('test_index', { title: 'Express' });
            });
            break;
         default:
            break;
      }
   })

   app.use(router);
   server.listen(8989, '127.0.0.1', () => {
      console.log(`Server running at http://${hostname}:${port}/`);
   })

   return {
      http, express,app,server
   }

}

