const express = require('express');
const UsersModel = require('../users/users.model');
const PostsModel = require('../posts/posts.model');

const likeRouter = express.Router();

// Like bai viet
likeRouter.post('/like/:id', async (req, res) => {
  // authenticate
  if (!req.session.currentUser) {
    res.status(400).json({
      success: false,
      message: 'Unauthenticated',
    });
  } else {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'Bad request',
      });
    } else {
      // them nguoi like vao post
      const post = await PostsModel.findById(req.params.id);
      // lay du lieu database
      let newPost = [];
      newPost = post.listUserLike;
      // kiem tra trung id
      for (let i = 0; i < newPost.length; i++) {
        if (newPost[i] != req.session.currentUser._id) {
          await newPost.push(req.session.currentUser._id);
          // update database
          post.listUserLike = newPost;
          await post.save();
          // 
          res.status(201).json({
            success: true,
            message: 'Done',
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'Value exist',
          });
        }
      }
    }
  }
});

module.exports = likeRouter;