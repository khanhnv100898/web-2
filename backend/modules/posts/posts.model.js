const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const PostSchema = new mongoose.Schema({
  view: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listUserLike: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comment: [{ body: String, date: Date }],
  date:{
    type:Date,
    default:Date.now,
  },
}, {
  timestamps: true,
});

const PostsModel = mongoose.model('Post', PostSchema);

module.exports = PostsModel;