const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cors = require('cors');
const userRouter = require('./modules/users/users.router');
const postRouter = require('./modules/posts/posts.router');

mongoose.connect('mongodb://localhost:27017/web-2', (error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connect to mongodb success.. ");
    const app = express();

    // user middleware
    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressSession({
      secret: 'keyboard main',
      resave: false,
      saveUninitialized: true,
    }));
    app.use(express.static('public'));

    //routers
    app.use('/api/users', userRouter);
    app.use('/api/posts',postRouter);

    // start server
    app.listen(3000, (error) => {
      if (error) {
        throw error;
      }
      console.log('Server listen on port 3000..');
    });
  }
});