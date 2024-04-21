const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  imageText: {
    type: String,
    required: true
  },
  imageLink:{
    type: String
  },
  image:{
    type: String
  },
  description:{
    type: String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  currentDate: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      text: {
        type: String
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  saves: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      folder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
      }
    }
  ]

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
