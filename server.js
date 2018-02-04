const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      http = require('http'),
      cookieParser = require('cookie-parser'),
      validator = require('express-validator'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
      passport = require('passport'),
      socketIO = require('socket.io'),
      container = require('./container'),
      keys = require('./config/keys'),
      PORT = process.env.PORT || keys.Port;





container.resolve(function(users, _, admin, home, group) {

    mongoose.Promise = global.Promise;
    mongoose.connect(keys.mongoURI, (err) => {
      (err) ? console.error(err, 'Error Connecting to Database!'): console.log('DB Connected. Build Something Awesome!');
      });

    const app = SetupExpress();
  
    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        const io = socketIO(server);

        server.listen(PORT, () => {
          console.log(`***Server up on port ${PORT}***`)
        });
        //invoke configure express
        ConfigureExpress(app);

      //socket
        require('./socket/group-socket-server')(io);

        //SETUP ROUTER
        const router = require('express-promise-router')();
        users.SetRouting(router);
        admin.SetRouting(router);
        home.SetRouting(router);
        group.SetRouting(router);

      app.use(router);
    }






    function ConfigureExpress(app) {
      require('./passport/passport-local');
      require('./passport/passport-google');
      require('./passport/passport-facebook');
      


      app.use(express.static('public'));
      app.use(cookieParser());
      app.set('view engine', 'ejs');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));
      
      app.use(validator());
      app.use(session({
        secret: keys.sessionSecret,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      }));
      app.use(flash());

      app.use(passport.initialize());
      app.use(passport.session());

      //locals
      app.locals._ = _;

    }
});

 
