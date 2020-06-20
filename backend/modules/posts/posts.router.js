const express = require('express');
const joi = require('@hapi/joi');
const PostsModel = require('./posts.model');

const postRouter = express.Router();

// Tao bai viet
postRouter.post('/', async (req, res) => {
  // authenticate
  if (!req.session.currentUser) {
    res.status(401).json({
      success: false,
      message: 'Unauthenticated',
    });
  } else {
    // validate
    const bodyValidation = joi.object({
      content: joi.string()
        .required()
        .min(5)
        .max(1000)
        .error(() => {
          return new Error('Invalid post content!');
        }),
      imageUrl: joi.string()
      .required()
      .error(() => {
        return new Error('Invalid image url!');
      }),
    });
    const validateResult = bodyValidation.validate(req.body);
    if(validateResult.error){
      res.status(400).json({
        success:false,
        message:validateResult.error.message,
      });
    }else{
      // save to database
      const newPostInfo = {
        content: req.body.content,
        imageUrl:req.body.imageUrl,
        author:req.body.currentUser._id,
      };
      const newPost = await PostsModel.create(newPostInfo);
      res.status(201).json({
        success:true,
        message:'Success',
        data:newPost,
      });
    }
  }
});

module.exports = postRouter;