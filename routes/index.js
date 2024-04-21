  var express = require('express');
  var router = express.Router();
  const userModel = require("./users");
  const postModel = require("./posts");
  const folderModel = require("./folder");
  const passport = require('passport');
  const crypto = require('crypto');
  const upload = require('./multer');
  const nodemailer = require('nodemailer');
  const mongoose = require('mongoose');
  const ObjectId = mongoose.Types.ObjectId;
  const LocalStrategy = require('passport-local').Strategy;
  const { cache } = require('ejs');
  const Folder = require('./folder');
  passport.use(new LocalStrategy(userModel.authenticate()));
 

/* GET home page. */
const imageUrls = [
  "https://i.pinimg.com/564x/07/ec/b0/07ecb0e3f716533eb06a56f23dd3efbc.jpg",
  "https://i.pinimg.com/564x/8b/f3/c5/8bf3c5fb13a63580ef07d34471292a37.jpg",
  "https://i.pinimg.com/564x/c1/c2/fe/c1c2fe1923945c1b55af125f349e060f.jpg",
  "https://i.pinimg.com/564x/03/79/eb/0379ebe68801db22c5705b1c21a8c48e.jpg",
  "https://i.pinimg.com/564x/de/de/a6/dedea622f3a8a7729eac720069981883.jpg",
  "https://i.pinimg.com/564x/98/e0/af/98e0af61b19e9c78292fbebd13d26220.jpg",
  "https://i.pinimg.com/564x/1e/1f/52/1e1f5274ab1e721a83c1e4036d8d1591.jpg",
  "https://i.pinimg.com/564x/25/97/e6/2597e67803348efc367067f2cef7c34e.jpg",
  "https://i.pinimg.com/564x/2f/cd/97/2fcd9789558216ab10a7f9ef7ed0717c.jpg",
  "https://i.pinimg.com/564x/79/f9/75/79f9754d67c5bd8226ce6a9eff20ff2a.jpg",
  "https://i.pinimg.com/564x/53/29/f9/5329f94329877fa57bd37cba747c993f.jpg",
  "https://i.pinimg.com/564x/4b/c5/f8/4bc5f8d5d76228f0d62f395c5c8a5ba6.jpg",
  "https://i.pinimg.com/564x/e4/27/f1/e427f1c2e5d13b999f8bf0bb3c624898.jpg",
  "https://i.pinimg.com/564x/e5/0b/f9/e50bf9e9d627e9d0cd696cc4fa6d7039.jpg",
  "https://i.pinimg.com/564x/0e/ab/e1/0eabe12054374b4b49ecdb27bd082556.jpg",
  "https://i.pinimg.com/564x/f5/01/5d/f5015dee1abd9f2bd8e64a348ef15be9.jpg",
  "https://i.pinimg.com/564x/04/fd/9c/04fd9cbb8a70e6daec370dff297040e6.jpg",
  "https://i.pinimg.com/564x/74/fb/a0/74fba064c7f99317b62a3bf14cbd6c76.jpg",
  "https://i.pinimg.com/564x/cd/0a/dd/cd0adddcd94ba68cef8b78b7310a55df.jpg",
  "https://i.pinimg.com/564x/75/b3/83/75b3834f67abd979b03b8ebb5500db90.jpg",
  "https://i.pinimg.com/564x/20/36/8e/20368e94a05d2729f275896817d069eb.jpg",
  "https://i.pinimg.com/564x/aa/94/bf/aa94bf38cde1cbb2a5a81065a4da787c.jpg",
  "https://i.pinimg.com/564x/eb/6a/59/eb6a596749639670541921cb1af8bab2.jpg",
  "https://i.pinimg.com/564x/b1/29/f6/b129f69309638fda34b7da2ebbfce83a.jpg",
  "https://i.pinimg.com/564x/c3/29/f2/c329f2a9af624772d788983d11d15456.jpg",
  "https://i.pinimg.com/564x/95/10/69/9510697e2ca7752f29b5e40c0091e99f.jpg",
  "https://i.pinimg.com/564x/6d/04/2d/6d042dc3847f8f9c8eebda5b880b3beb.jpg",
  "https://i.pinimg.com/564x/11/ac/02/11ac025f33ced67df6354497b3233789.jpg",
  "https://i.pinimg.com/564x/5b/92/c3/5b92c33cf85527b4af0c172b1dbda8a9.jpg",
  "https://i.pinimg.com/564x/c2/c7/5c/c2c75c112c60c3b5dd891703ed12d466.jpg",
  "https://i.pinimg.com/564x/b6/42/4e/b6424e3a93f28c693fdc5b4308082fcc.jpg",
  "https://i.pinimg.com/564x/1a/8e/cb/1a8ecbd4182904cc0334c1bd02f51633.jpg",
  "https://i.pinimg.com/564x/ff/22/52/ff22523ded8e440ab7462b5d49874864.jpg",
  "https://i.pinimg.com/564x/e8/b5/7d/e8b57d55755a4584d72282296bd037f9.jpg",
  "https://i.pinimg.com/564x/ff/92/b7/ff92b7bf1341a6fd8758f0f729082873.jpg",
  "https://i.pinimg.com/564x/38/84/38/388438307ab2c677c79b7c9100beb189.jpg",
  "https://i.pinimg.com/564x/7e/23/8c/7e238cf4b609d0cfe86e92ac8a364ad6.jpg",
  "https://i.pinimg.com/564x/2e/27/49/2e2749be2bd73d3d0d2c8d333360280f.jpg",
  "https://i.pinimg.com/564x/c4/f0/88/c4f088745587ad5da0722e6077071d89.jpg",
  "https://i.pinimg.com/564x/8d/45/46/8d454630394026d7f536c63df7ac48ca.jpg",
  "https://i.pinimg.com/564x/dc/e4/04/dce404f375b13fbae822d6fe12a1ea0b.jpg",
  "https://i.pinimg.com/564x/e1/3c/7c/e13c7c2549e6ca23ea1266e1663ae926.jpg",
  "https://i.pinimg.com/564x/8d/87/6c/8d876c9f10a60a811757101ab3b80b93.jpg",
  "https://i.pinimg.com/564x/66/85/c9/6685c9073ab8739cd73909de349acf8b.jpg",
  "https://i.pinimg.com/564x/11/4d/d5/114dd501c649c7d5606fb9015c867980.jpg",
  "https://i.pinimg.com/564x/35/56/47/35564708f6922dd1eb83eeee0851387b.jpg",
  "https://i.pinimg.com/564x/e4/ea/04/e4ea048aae61998b94f5814811f01cda.jpg",
  "https://i.pinimg.com/564x/2a/79/27/2a792722fecac5f576abc7654cb3a420.jpg",
  "https://i.pinimg.com/564x/1e/27/9a/1e279a74059dd0086bab710293f9d833.jpg",
  "https://i.pinimg.com/564x/35/a2/4a/35a24a09efccef484f2efa6723f04e70.jpg",
  "https://i.pinimg.com/564x/0d/46/73/0d4673412365c88fa614602ab5a6bbce.jpg",
  "https://i.pinimg.com/564x/3a/a9/0e/3aa90e9c9cc78e762e1071c711f0c775.jpg",
  "https://i.pinimg.com/564x/2c/ab/78/2cab78a8830951815f5f04a433cf4a4d.jpg",
  "https://i.pinimg.com/736x/68/1a/b0/681ab092902eff33f74b8053dbc7a6f1.jpg",
  "https://i.pinimg.com/736x/bb/ee/68/bbee680946e016209919936388e0c64b.jpg",
  "https://i.pinimg.com/564x/53/e5/d2/53e5d2914082ccdd154cd90fc66e7c21.jpg",
];

const limit = 25;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get('/', async function(req, res, next) {
  
 try{
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }
      const randomizedImageUrls = shuffleArray([...imageUrls]).slice(0, limit);

      return res.render('index', {error: req.flash('error'),showNavbar: false, imageUrls: randomizedImageUrls });
  }catch (error) {
  console.error(error);
  next(error);
}
});

router.get('/login', function(req, res, next) {
  try{
    const randomizedImageUrls = shuffleArray([...imageUrls]).slice(0, limit);
  res.render('login', {error: req.flash('error'), showNavbar: false, imageUrls: randomizedImageUrls});
  }catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

function getRandomOrder(req, res, next) {
  postModel.find().populate('user').exec()
    .then(posts => {
      res.locals.randomizedPosts = shuffleArray(posts);
      next();
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
}

// Add this new route to handle folder selection
router.get('/select-folder/:folderId', isLoggedIn, async (req, res) => {
  try {
    let { folderId } = req.params;

    // Check if folderId is not provided or not a valid ObjectId
    if (!folderId || !mongoose.Types.ObjectId.isValid(folderId)) {
      // If not valid, default to the user's default folder
      folderId = req.user.defaultFolder._id;
    }

    // Check if the selected folder is the same as the current one
    if (req.session.selectedFolderId && req.session.selectedFolderId.toString() === folderId.toString()) {
      // You can choose to keep the current folder selected or redirect to the feed page
      res.redirect('/feed');
    } else {
      // Store the selectedFolderId in the session
      req.session.selectedFolderId = folderId;
      const redirectBack = req.query.redirectBack || '/feed';
     
      return res.redirect(redirectBack);
       // Redirect back to the feed page after selecting the folder
    }
  } catch (error) {
    console.error('Error selecting folder:', error);
    res.status(500).json({ error: 'Error selecting folder', details: error.message });
  }
});

router.get('/folderList', isLoggedIn, async (req, res, next) => {
 try{
  const user = await userModel.findOne({
    username: req.session.passport.user
  }).populate('Folders');
  const folders = [...user.Folders, user.defaultFolder];
  if (req.xhr) {
    return res.json({ folders });
  }
 }catch(error){
  console.error('Error in folder list:', error);
  res.status(500).json({ error: 'Error in folder list', details: error.message });
 }
});


router.get('/feed', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user
    }).populate('Folders');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } // Fetch all posts in descending order
      const allPosts = await postModel.find().sort({ createdAt: 'desc' });
      // Reverse the order of posts
      const reversedPosts = allPosts.reverse();
    // Send the user's folders, including the default folder, to the client
   
    if (req.xhr) {
      return res.json({ user, posts: reversedPosts,  loggedInUser: req.user,
        showNavbar: true });
    } else {
      return res.render('feed', {
        user,
        posts: reversedPosts,       
        loggedInUser: req.user,
        showNavbar: true
      });
    }
  } catch (error) {
    console.error('Error fetching user folders:', error);
    next(error);
  }
});

router.get('/get-selected-folder', isLoggedIn, async (req, res) => {
  try {
    const selectedFolderId = req.session.selectedFolderId;
    const user = await userModel.findOne({
      username: req.session.passport.user
    }).populate({
      path: 'Folders',
    }).populate({
      path: 'defaultFolder',
    });
    const selectedFolder = selectedFolderId
      ? [...user.Folders, user.defaultFolder].find(folder => folder._id.toString() === selectedFolderId)
      : user.defaultFolder;

    if (req.xhr) {
      res.json({ selectedFolder });
    }
  } catch (error) {
    console.error('Error fetching selected folder:', error);
    res.status(500).json({ error: 'Error fetching selected folder', details: error.message });
  }
});


router.get('/editProfile', isLoggedIn,async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  res.render('editProfile', { user, showNavbar: true , error: req.flash('error')});
});

router.get('/createPost', isLoggedIn,function(req, res, next) {
  res.render('createPost', { showNavbar: true, error: req.flash('error') });
});

router.post('/uploadFile', isLoggedIn, upload.single('dp'), async function(req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });

    if (req.file) {
      // If a file is uploaded, update the user's profile picture
      user.dp = req.file.filename;
    }
      // Check if the username is being updated
    if (req.body.username && req.body.username !== user.username) {
      // If the username is changed, update only the username
      user.username = req.body.username;
      await user.save();
      return res.redirect('/profile');
    }
    // Update other fields
    user.about = req.body.about;
    user.fullname = req.body.fullname;
    await user.save();

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    // Handle the error appropriately, e.g., redirect to an error page or show a flash message
    res.redirect('/profile'); // Redirect to the profile page or any other desired page
  }
});


router.post('/upload', isLoggedIn, upload.single('file'), async function(req, res, next) {
  if(!req.file){
    req.flash('error', 'Please select the Image')
    return res.redirect('/createPost');
  }

  const caption = req.body.caption;

  if (!caption) {
    req.flash('error', 'Caption is required');
    return res.redirect('/createPost');
  }

  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.caption,
    description: req.body.description,
    imageLink:req.body.imageLink,
    user: user._id
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect('/feed');
});

router.post('/editPost/:postId', async function(req, res, next){
  try{
    const postId = req.params.postId;
    const post = await postModel.findById(postId);

    post.imageText = req.body.caption,
    post.description = req.body.description,
    post.imageLink = req.body.imageLink,

    await post.save();
    return res.redirect('/profile');
  }catch(error){
    console.error(error);
    // Handle the error appropriately, e.g., redirect to an error page or show a flash message
    res.redirect('/profile'); 
  }
});

router.delete('/post/delete/:postID', async function (req, res, next) {
  try {
    const postId = req.params.postID;
    const user = req.user;

    // Assuming your user has a posts array, and each post in the array has an _id
    if (user && user.posts) {
      const postIndex = user.posts.findIndex(postId => postId.equals(postId));

      if (postIndex !== -1 && user.posts[postIndex]) {
        // Fetch the post from the database using the post ID
        const post = await postModel.findById(postId);

        if (post && post.user.equals(user._id)) {
          // Remove the post ID from the user's posts array
          user.posts.splice(postIndex, 1);

          // Save the user document to persist the changes
          await user.save();

          // Delete the post from the database
          await postModel.findByIdAndDelete(postId);

          res.json({ message: 'Post deleted successfully.' });
        } else {
          res.status(403).json({ error: 'Unauthorized: You cannot delete this post.' });
        }
      } else {
        res.status(404).json({ error: 'Post not found.' });
      }
    } else {
      res.status(404).json({ error: 'User or posts not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash: true,
}), function(req, res, next) {
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days (adjust as needed)
});
router.get('/profile', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user
    })
    .populate({
      path: 'posts',
      model: 'Post'
    })
    .populate({
      path: 'defaultFolder.posts',
      model: 'Post'
    }).populate('Folders');

    if (!user) {
      return res.status(404).render('404'); // Handle user not found
    }

    const folders = await folderModel.find({
      user: user._id
    }).populate({
      path: 'posts',
      model: 'Post'
    });

    const selectedFolderId = req.session.selectedFolderId;

    const selectedFolder = await selectedFolderId
  ? [...user.Folders, user.defaultFolder].find(folder => folder._id.toString() === selectedFolderId)
  : user.defaultFolder;


    // Send the user's folders, including the default folder, to the client
    const foldersList = [...user.Folders, user.defaultFolder];

    // Reverse the posts array if it exists
    if (user.posts) {
      user.posts = user.posts.reverse();
    }

    res.render('profile', { user, folders, foldersList, selectedFolder, error: req.flash('error'), loggedInUser: req.user, showNavbar: true });
  } catch (error) {
    // Handle errors (log, render an error page, etc.)
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:username', isLoggedIn, async (req, res, next) => {
  try {
    const username = req.params.username;

    const user = await userModel
      .findOne({ username })
      .populate({
        path: 'posts',
        model: 'Post',
      })
      .populate({
        path: 'defaultFolder.posts',
        model: 'Post',
      });

    if (!user) {
      return res.status(404).render('404'); // Handle user not found
    }

    const folders = await folderModel
      .find({
        user: user._id,
      })
      .populate({
        path: 'posts',
        model: 'Post',
      });

    // Populate folders for the logged-in user
    const Currentuser = await req.user.populate('Folders');

    const selectedFolderId = req.session.selectedFolderId;

    const selectedFolder = selectedFolderId
      ? [...Currentuser.Folders, Currentuser.defaultFolder].find(
          (folder) => folder._id.toString() === selectedFolderId
        )
      : Currentuser.defaultFolder;

    // Send the user's folders, including the default folder, to the client
    const foldersList = [...Currentuser.Folders, Currentuser.defaultFolder];

    // Reverse the posts array if it exists
    if (user.posts) {
      user.posts = user.posts.reverse();
    }

    // Fetch posts for the user
    res.render('profile', {
      user,
      folders,
      foldersList,
      selectedFolder,
      loggedInUser: req.user,
      error: req.flash('error'),
      showNavbar: true,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});




// Route to view posts in a specific folder
router.get('/folder/:folderId', isLoggedIn, async (req, res, next) => {
  try {
    const folderId = req.params.folderId;
    const Currentuser = await userModel.findOne({
      username: req.session.passport.user
    }).populate('Folders');
    // Check if the folderId belongs to folderModel
    const folder = await folderModel.findById(folderId).populate({
      path: 'posts',
      model: 'Post'
    });
    const selectedFolderId = req.session.selectedFolderId;

    const selectedFolder = await selectedFolderId
            ? [...Currentuser.Folders, Currentuser.defaultFolder].find(folder => folder._id.toString() === selectedFolderId)
            : Currentuser.defaultFolder;

    // Send the user's folders, including the default folder, to the client
    const folders = [...Currentuser.Folders, Currentuser.defaultFolder];


    if (!folder) {
      // If folderId is not found in folderModel, assume it's from userModel (defaultFolder)
      const Currentuser = await userModel.findOne({
        'defaultFolder._id': folderId
      }).populate({
        path: 'defaultFolder.posts',
        model: 'Post'
      });

      if (!Currentuser) {
        return res.status(404).render('404'); // Handle not found
      }

      // Render the page with the posts in the default folder of the user
      res.render('SingleFolder', {Currentuser, folders,
        selectedFolder,folder: Currentuser.defaultFolder, loggedInUser: req.user, showNavbar: true });
    } else {
      // Render the page with the posts in the folder
      res.render('SingleFolder', {Currentuser, folders,
        selectedFolder, folder, loggedInUser: req.user, showNavbar: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route to handle the creation of a new board
router.post('/create-board', isLoggedIn,async (req, res) => {
  try {
    const { name, isPrivate } = req.body;
    const user = await userModel.findOne({username: req.session.passport.user});

   const existingFolder = await folderModel.findOne({ user: user._id, name });

    if (existingFolder) {
      req.flash('error', 'Board with this name already exists');
      return res.redirect('/profile');
    }else{
      const newFolder = await folderModel.create({
        user: user._id,
        name,
        isPrivate: !!isPrivate, // Convert isPrivate to a boolean
      });
      user.Folders.push(newFolder._id);
    }
    await user.save();
    res.redirect('/profile'); // Redirect to the user's profile after creating the board
  } catch (error) {
    req.flash('error', 'Error creating board');
    res.redirect('/profile'); // Handle errors appropriately
  }
});

// Assuming you have a route to handle saving images
router.post('/save-to-folder', async (req, res) => {
  try {
      const { postId, folderId } = req.body;

      const user = await userModel.findOne({ username: req.session.passport.user });
      const post = await postModel.findById(postId);

      if (!user || !post) {
          req.flash('error', 'User or post not found');
          return res.redirect('/feed');
      }

      let selectedFolder;
      if (folderId && user.defaultFolder && !user.defaultFolder._id.equals(folderId)) {
        // If folderId is provided, check if it belongs to the user
        const folderInFolderModel = await folderModel.findOne({ _id: folderId, user: user._id });
          if (folderInFolderModel) {
              selectedFolder = folderInFolderModel;
              selectedFolder.posts.push(post._id);
              await folderInFolderModel.save();
          } else {
              req.flash('error', 'Folder not found');
              return res.redirect('/feed');
          }
      } else {
          // If folderId is not provided, use the default folder
          selectedFolder = user.defaultFolder;
      }

      // Save the post to the folder
   // Save the post to the folder
      post.saves.push({ user: user._id, folder: selectedFolder._id });
      selectedFolder.posts.push(post._id);

      // Check if the selectedFolder has a save method before calling it
      await user.save();

      // Attempt to save the post
      await post.save();

      const redirectBack = req.query.redirectBack || '/feed';
     
      return res.redirect(redirectBack);
  } catch (error) {
      console.error(error);
      req.flash('error', 'Error saving image to folder');
      return res.status(500).json({ error: 'Error saving image to folder', details: error.message });
  }
});


router.post('/unsave-from-folder', async (req, res) => {
  try {
    const { postId, folderId } = req.body;
    const user = await userModel.findOne({ username: req.session.passport.user });
 
    if (!user) {
      req.flash('error', 'User not found');
      return res.status(400).send('User not found');
    }

    const post = await postModel.findById(postId);

    if (!post) {
      req.flash('error', 'Post not found');
      return res.status(400).send('Post not found');
    }


    let selectedFolder;

    if (folderId && user.defaultFolder && !user.defaultFolder._id.equals(folderId)) {
      // If folderId is not the default folder, find the folder in FolderModel
      selectedFolder = await folderModel.findById(folderId);

      if (!selectedFolder || !selectedFolder.posts) {
        req.flash('error', 'Folder not found');
        return res.status(400).send('Folder not found');
      }

      // Remove postId from the selected folder's posts array
      selectedFolder.posts.pull(postId);
      await selectedFolder.save();
    } else {
      // If folderId is the default folder, use user's default folder
      selectedFolder = user.defaultFolder;

      // Remove postId from the user's default folder's posts array
      selectedFolder.posts.pull(postId);
      await user.save();
    }

    // Remove the save entry from the post's saves array
    // post.saves.splice(saveEntryIndex, 1);
    // await post.save();
    const redirectBack = req.query.redirectBack || '/feed';

    return res.redirect(redirectBack);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error unsaving image');
    res.status(500).send('Error unsaving image');
  }
});




// Follow a user
router.post('/:username/follow', async (req, res, next) => {
  try {
    const username = req.params.username;
    const currentUser = req.user; // Assuming you have user information in the request object

    // Find the user to follow
    const userToFollow = await userModel.findOne({ username });

    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current user is already following
    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);

      await currentUser.save();
      await userToFollow.save();
      const redirectBack = req.query.redirectBack || `/${username}`;
      return res.redirect(redirectBack);
    } else {
      return res.status(400).json({ error: 'Already following this user' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Unfollow a user
router.post('/:username/unfollow', async (req, res, next) => {
  try {
    const username = req.params.username;
    const currentUser = req.user; // Assuming you have user information in the request object

    // Find the user to unfollow
    const userToUnfollow = await userModel.findOne({ username });

    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current user is following
    if (currentUser.following.includes(userToUnfollow._id)) {
      // Remove from following list
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToUnfollow._id.toString()
      );

      // Remove from followers list
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );

      await currentUser.save();
      await userToUnfollow.save();
      const redirectBack = req.query.redirectBack || `/${username}`;
      return res.redirect(redirectBack);
    } else {
      return res.status(400).json({ error: 'Not following this user' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Define a route to display a single post
router.get('/posts/:postId', isLoggedIn,async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId).populate('user').populate('comments.user').populate('likes.user'); // Adjust your model accordingly
    const user = await userModel.findOne({
      username: req.session.passport.user
    }).populate('Folders');

    if (!post) {
      return res.status(404).render('404'); // Handle post not found
    }

   

    const remainingPosts = await postModel.find({ _id: { $ne: post._id } }).populate('user');
    if (req.xhr) {
      return res.json({
        post,
        user,
        loggedInUser: req.user,
        showNavbar: true,
        updatedPost: null,
        commentDropdownState: 'visible',
        remainingPosts: remainingPosts
      });
    }else{
      res.render('singlePost', { post, user, loggedInUser: req.user, showNavbar: true , updatedPost: null,commentDropdownState: 'visible',remainingPosts: remainingPosts});  
    }
     } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/posts/:postId/like', isLoggedIn, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId);

    // Check if the user has already liked the post
    const likeIndex = post.likes.findIndex(like => like.user && like.user.equals(req.user._id));


    if (likeIndex !== -1) {
      // User already liked the post, unlike it
      post.likes.splice(likeIndex, 1);
    } else {
      // User hasn't liked the post, like it
      post.likes.push({ user: req.user._id });
    }

    await post.save();
    res.redirect('/posts/' + postId); // Redirect to the post feed or wherever you want
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Comment on a post
router.post('/posts/:postId/comment', isLoggedIn, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId);

    const newComment = {
      text: req.body.comment,
      user: req.user._id
    };

    post.comments.push(newComment);
    await post.save();

    const updatedPost = await postModel.findById(postId).populate('user').populate('comments.user');
    const commentDropdownState = req.session.commentDropdownState || 'hidden';

    res.redirect(`/posts/${postId}?commentDropdownState=${commentDropdownState}&updatedPost=${JSON.stringify(updatedPost)}`); // Redirect to the post feed or wherever you want
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a comment
router.delete('/posts/:postId/comments/:commentId', isLoggedIn, async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const post = await postModel.findById(postId);

    // Find the index of the comment in the post's comments array
    const commentIndex = post.comments.findIndex(comment => comment._id.equals(commentId));

    if (commentIndex !== -1) {
      // Check if the user trying to delete the comment is the one who created it
      if (post.comments[commentIndex].user.equals(req.user._id)) {
        post.comments.splice(commentIndex, 1);
        await post.save();

        const updatedPost = await postModel.findById(postId).populate('user').populate('comments.user');
        const commentDropdownState = req.session.commentDropdownState || 'hidden';

        res.redirect(`/posts/${postId}?commentDropdownState=${commentDropdownState}`);
      } else {
        res.status(403).json({ error: 'Unauthorized: You cannot delete this comment.' });
      }
    } else {
      res.status(404).json({ error: 'Comment not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/register', function(req, res){
  const {username, email, fullname} = req.body;
  const defaultFolderId = new ObjectId();
  const userData = new userModel({
    username,
    email,
    fullname,
    defaultFolder: {
      _id: defaultFolderId,
      name: 'All Pins',
      isPrivate: false,
      posts: [],
    },
  });

  userModel.findOne({ $or: [{ username: username }, { email: email }] })
    .then(existingUser => {
      if (existingUser) {
        req.flash('error', 'An account with this username or email already exists.');
        res.redirect('/');
      } else {
        userModel.register(userData, req.body.password)
          .then(() => {
            passport.authenticate('local')(req, res, function() {
              res.redirect('/feed');
            });
          })
          .catch(err => {
            console.error(err);
            req.flash('error', 'Something went wrong during registration.');
            res.redirect('/');
          });
      }
    })
    .catch(err => {
      console.error(err);
      req.flash('error', 'Something went wrong during registration.');
      res.redirect('/');
    });
})

router.get('/search/:searchTerm', async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm.trim();

    if (searchTerm === '') {
      // If the search term is empty, send an empty array
      return res.json({ users: [], loggedInUser: req.user });
    }

    // Use a case-insensitive regular expression to find users whose usernames or full names match the search term
    const users = await userModel.find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { fullname: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    res.json({ users, loggedInUser: req.user });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function isLoggedIn (req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
