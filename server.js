const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      http = require('http'),
      container = require('./container'),
      keys = require('./config/keys'),
      PORT = process.env.PORT || keys.Port;


container.resolve(function(users) {
  const app = SetupExpress();
  
  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`***Server up on port ${PORT}***`)
    });
    ConfigureExpress(app);

      //SETUP ROUTER
    const router = require('express-promise-router')();
    users.SetRouting(router);

    app.use(router);
  }


  function ConfigureExpress(app) {
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
  }

});

 
