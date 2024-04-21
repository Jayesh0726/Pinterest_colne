document.addEventListener('DOMContentLoaded', function (){
    // Get the container element
    let editpostCover = document.querySelector('.edit-post-cover');
    let closeimageform = document.querySelector('#closeEditForm');

    let postContainer = document.getElementById('postContainer');

    // Check if there are images in the container
    let hasImages = postContainer.querySelectorAll('.box a img').length > 0;
    postContainer.style.columns = hasImages ? '6' : 'initial';
    postContainer.style.columnGap = hasImages ? '20px' : 'initial';

    const activeTab = localStorage.getItem('activeTab');

    // If there's an active tab, show the corresponding posts
    if (activeTab) {
      showPosts(activeTab);
    }
  });


  function toggleFollow(action) {
    const followButton = document.querySelector('.follow-unfollow-container button');
    const isFollowing = followButton.classList.contains('following');
  
    // Toggle the 'following' class to trigger the transition effect
    followButton.classList.toggle('following');
  
    // You can add additional logic here, such as sending an AJAX request
  
    // This timeout simulates a delay in the server response
    setTimeout(() => {
      // If the user is currently following, set the form action and submit
      const form = isFollowing ? document.getElementById('unfollowForm') : document.getElementById('followForm');
      form.action = action;
      form.submit();
    }, 500); // Adjust the delay as needed
  }

  function showPosts(type) {
    var containerCreated = document.querySelector('.container-created');
    var containerSaved = document.querySelector('.container-saved');
    var createdPosts = document.querySelector('.created-posts');
    var savedPosts = document.querySelector('.saved-posts');
    
    containerCreated.classList.remove('active');
    containerSaved.classList.remove('active');
    createdPosts.classList.remove('active');
    savedPosts.classList.remove('active');

    if (type === 'created') {
      containerCreated.classList.add('active');
      createdPosts.classList.add('active');
    } else if (type === 'saved') {
      containerSaved.classList.add('active');
      savedPosts.classList.add('active');
    }

    // Save the active tab to localStorage
    localStorage.setItem('activeTab', type)
  }

  function handleHover(element, event) {
    const editImg = element.querySelector('.editImg');
    const SaveBoards = element.querySelector('.save-Boards');
    const Link = element.querySelector('.Link');
  
    if (SaveBoards) {
      if (event.type === 'mouseover') {
        // On hover
        SaveBoards.style.transform = 'scale(1)';
        if (Link) {
          Link.style.transform = 'scale(1)';
        }
        if (editImg) {
          editImg.style.transform = 'scale(1)';
        }
      } else if (event.type === 'mouseout') {
        // On mouseout
        if (editImg) {
          editImg.style.transform = 'scale(0)';
        }
        SaveBoards.style.transform = 'scale(0)';
        if (Link) {
          Link.style.transform = 'scale(0)';
        }
      }
    }
  }
  
function editFormButton(post_Id){
  const editform = document.getElementById(`editPostForm_${post_Id}`);
  const closeForm = document.getElementById(`closeEditForm_${post_Id}`);
  const submitPostForm = document.getElementById(`submitEditPostForm_${post_Id}`);
  const editedPostForm = document.getElementById(`editedpostForm_${post_Id}`);
  
  const body = document.body;
  editform.style.transform = 'scale(1)';
  body.style.overflow = 'hidden'; 

  closeForm.addEventListener('click', function(){
    editform.style.transform = 'scale(0)';
    body.style.overflow = 'auto';
   });

   submitPostForm.addEventListener('click', function(){
    editedPostForm.click();
   });
}
async function deletePost(postId) {
  try {
      const response = await fetch(`/post/delete/${postId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = await response.json();

      if (response.ok) {
          // Redirect or handle success as needed
          window.location.href = '/profile';
      } else {
          console.error(data.error || 'Failed to delete post.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
function toggleBoardsBtn(element, postId) {

  const boarMenu = document.querySelector(`#Board-${postId}`);
  console.log('Boar Menu:', boarMenu);
  if (boarMenu) {
    const toggleBtn = parseInt(element.dataset.toggleBtn, 10) || 0;

    if (toggleBtn === 0) {
      boarMenu.style.transform = 'scale(1)';
      element.dataset.toggleBtn = '1';
    } else {
      boarMenu.style.transform = 'scale(0)';
      element.dataset.toggleBtn = '0';
    }
  }
}

let toggleBtn = false;
let create_boards_pins_icons = document.querySelector(".create-boards-or-pins");
function creatBoardsPins() {
  let create_boards_pins_menu = document.querySelector(".pins-boards-menu");
  let create_icon = document.querySelector(".ri-add-fill");

  if (!toggleBtn) {
    create_boards_pins_menu.style.transform = "scale(1)";
    create_boards_pins_icons.classList.add("active-icon");
    create_icon.style.color = "#fff";
    toggleBtn = !toggleBtn;
  } else {
    create_boards_pins_menu.style.transform = "scale(0)";
    create_boards_pins_icons.classList.remove("active-icon");
    create_icon.style.color = "initial";
    toggleBtn = false;
  }
}

const boardForm = document.querySelector('.cover-boards-form');

function createBoards() {
  boardForm.style.transform = 'scale(1)';
}

function closeform() {
  boardForm.style.transform = 'scale(0)';
}