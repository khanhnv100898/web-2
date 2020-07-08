const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cors = require('cors');
const userRouter = require('./modules/users/users.router');
const postRouter = require('./modules/posts/posts.router');
const uploadsRouter = require('./modules/uploads/uploads.router');
const likeRouter = require('./modules/interactive/likes.router');

mongoose.connect('mongodb://localhost:27017/web-2', (error) => {
  if (error) {
    console.log(error);
    throw error;
  } else {
    console.log("Connect to mongodb success..");
    
    const server = express();

    // user middleware
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();

    });
    server.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(expressSession({
      secret: 'keyboard main',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    }));
    server.use(express.static('public'));

    //routers
    server.use('/api/users', userRouter);
    server.use('/api/posts', postRouter);
    server.use('/api/uploads', uploadsRouter);
    server.use('/api/interactives', likeRouter);

    // start server
    server.listen(3001, (error) => {
      if (error) {
        throw error;
      }
      console.log('Server listen on port 3001..');
    });
  }
});