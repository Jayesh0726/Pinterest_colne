  const mongoose = require('mongoose');
  const plm = require('passport-local-mongoose');

  require('dotenv').config();

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI);

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
    },
    about:{
      type: String,
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }],
    Folders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
    }],

    defaultFolder: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => mongoose.Types.ObjectId(), // Use a default function to generate ObjectId
      },
      name: {
        type: String,
        default: 'All Pins',
      },
      isPrivate: {
        type: Boolean,
        default: false,
      },
        posts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
          },
        ],
      },
    dp: {
      type: String,
      default: "account_logo.jpeg" 
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required: true
    },
    resetPasswordToken: {
      type:String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  });

  userSchema.plugin(plm);

  module.exports = mongoose.model('User', userSchema);
