const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const folderSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: false, // Default value if not provided
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  });

  
  const Folder = mongoose.model('Folder', folderSchema);

  module.exports = Folder;