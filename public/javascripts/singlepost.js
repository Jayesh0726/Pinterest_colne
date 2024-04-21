const urlParams = new URLSearchParams(window.location.search);
document.addEventListener('DOMContentLoaded',async function () {
    // Check and set the initial state of the dropdown on page load
    const commentDropdown = document.getElementById('commentDropdown');
    const icon = document.querySelector('.drop-down-up-icon');
    const likeForm = document.querySelector('.like-form');
  
    // Retrieve the state passed from the server
    const commentDropdownState = '<%= commentDropdownState %>';
    
    if (commentDropdownState === 'visible') {
      commentDropdown.style.display = 'block';
      icon.classList.remove('ri-arrow-up-s-line');
      icon.classList.add('ri-arrow-down-s-line');
    } else {
      commentDropdown.style.display = 'none';
      icon.classList.remove('ri-arrow-down-s-line');
      icon.classList.add('ri-arrow-up-s-line');
    }
   
    const updatedPostParam = urlParams.get('updatedPost');
    const updatedPost = updatedPostParam ? JSON.parse(updatedPostParam) : null;

    // Check if the comment dropdown was open before the reload
    const isCommentDropdownOpen = localStorage.getItem('isCommentDropdownOpen') === 'true';

    if (isCommentDropdownOpen) {
      commentDropdown.style.display = 'block';
      icon.classList.remove('ri-arrow-up-s-line');
      icon.classList.add('ri-arrow-down-s-line');
    }

    // Add a beforeunload event listener to save the state before the page reloads
    window.addEventListener('beforeunload', function () {
      const isDropdownOpen = commentDropdown.style.display === 'block';
      localStorage.setItem('isCommentDropdownOpen', isDropdownOpen);
    });
   
   

    // Add event listener to the entire likes container
    likeForm.addEventListener('mousedown', function (event) {
      // Check if the click occurred on the like or unlike icon
      const likeIcon = event.target.closest('.like-icon');
      const alreadyLikeIcon = event.target.closest('.already-like-icon');

      if (likeIcon || alreadyLikeIcon) {
        // Prevent the default form submission
        event.preventDefault();
        // Submit the form directly
        likeForm.submit();
      }
    });

    const saveUnsavedSinglepost = document.querySelector('.save-unsave-singlePost');
      let selectedFolderData;
       let foldersData;
    const fetchUpdatedSelectedFolder = async () => {
      try {
        const response = await fetch(`/get-selected-folder`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const data = await response.json();
        selectedFolderData = data.selectedFolder;
        return selectedFolderData;
      } catch (error) {
        console.error('Error fetching updated folder data:', error);
      }
    };

    const fetchFolderList = async () => {
      try {
        const response = await fetch(`/folderList`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const data = await response.json();
        foldersData = data.folders;
        return foldersData;
      } catch (error) {
        console.error('Error fetching updated folder data:', error);
      }
    };

        const handleSaveToFolder = async (postId, folderId) => {
      try {
        const response = await fetch('/save-to-folder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({ postId, folderId }),
        });
        if (response.ok) {
        let selectFolder =  await fetchUpdatedSelectedFolder();
        createFeedHTML(selectFolder);
        
        
        }
      } catch (error) {
        console.error('Error saving to folder:', error);
      }
    };

    const handleUnsavedToFolder = async (postId, folderId) => {
      try {
        const response = await fetch('/unsave-from-folder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({ postId, folderId }),
        });
        if (response.ok) {
        let selectFolder = await fetchUpdatedSelectedFolder();
          createFeedHTML(selectFolder);

        }
      } catch (error) {
        console.error('Error saving to folder:', error);
      }
    };

       async function handleFolderList(folderId) {
      try {
        const response = await fetch(`/select-folder/${folderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          
        });
        if (response.ok) {
        let selectFolder = await fetchUpdatedSelectedFolder();
          createFeedHTML(selectFolder);
        }
      } catch (error) {
        console.error('Error saving to folder:', error);
      }
    }

    saveUnsavedSinglepost.addEventListener('click', async (event) => {
      const target = event.target;
      if(target.classList.contains('boars-items')) {
        const folderId = target.getAttribute('data-folder-list-id');
        handleFolderList(folderId);
      }
      
      // Check if the clicked element is a save or unsave button
      if (target.classList.contains('Save')) {
        const postId = target.getAttribute('data-post-id');
        const folderId = target.getAttribute('data-folder-id');
        handleSaveToFolder(postId, folderId);
      }

      // Handle click on the Unsave button
      if (target.classList.contains('unSave')) {
        const postId = target.getAttribute('data-post-id');
        const folderId = target.getAttribute('data-folder-id');
        handleUnsavedToFolder(postId, folderId);
      }
    });


async function createFeedHTML(updatedselectedFolderData) {
        const postHTMLArray = ()=> {
            return `
             <button type="button" class="${updatedselectedFolderData.posts && updatedselectedFolderData.posts.includes(post._id) ? 'unSave' : 'Save'}" 
            data-post-id="${post._id}" data-folder-id="${updatedselectedFolderData._id}">
            ${updatedselectedFolderData.posts && updatedselectedFolderData.posts.includes(post._id) ? 'Saved' : 'Save'}
            </button>`
             
        }
    
          saveUnsavedSinglepost.innerHTML = postHTMLArray;

    }
    // Initial fetch when the page loads
    await fetchUpdatedSelectedFolder();
    await fetchFolderList();
    await createFeedHTML(selectedFolderData);

});

function toggleCommentDropdown() {
    const commentDropdown = document.getElementById('commentDropdown');
    const icon = document.querySelector('.drop-down-up-icon');

    if (commentDropdown.style.display === 'none' || commentDropdown.style.display === '') {
      commentDropdown.style.display = 'block';
      icon.classList.remove('ri-arrow-up-s-line');
      icon.classList.add('ri-arrow-down-s-line');
    } else {
      commentDropdown.style.display = 'none';
      icon.classList.remove('ri-arrow-down-s-line');
      icon.classList.add('ri-arrow-up-s-line');
    }
  }

  function handleHoverPosts(element, event) {
    const SaveBoards = element.querySelector('.save-Boards-singlePost');
    const Link = element.querySelector('.Link-singlePost');
  

    if (SaveBoards) {
      if (event.type === 'mouseover') {
        // On hover
        SaveBoards.style.transform = 'scale(1)';
        if (Link) {
          Link.style.transform = 'scale(1)';
        }
      } else if (event.type === 'mouseout') {
        // On mouseout
        SaveBoards.style.transform = 'scale(0)';
        if (Link) {
          Link.style.transform = 'scale(0)';
        }
      }
    }
  }

  function toggleBoardsBtn(element, postId) {
    console.log('Element:', element);
    console.log('Post ID:', postId);
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

function toggleDeleteButton(commentId) {
  const deleteBtn = document.getElementById(`deleteBtn_${commentId}`);
  deleteBtn.style.display = (deleteBtn.style.display === 'none' || deleteBtn.style.display === '') ? 'block' : 'none';
}

function addBlurEventListener(commentId) {
  const deleteBtn = document.getElementById(`deleteBtn_${commentId}`);
  
  // Add a blur event listener to hide the delete button when clicking outside of it
  document.addEventListener('click', function (event) {
    const target = event.target;
    if (!deleteBtn.contains(target)) {
      // Click occurred outside the delete button, hide it
      deleteBtn.style.display = 'none';
    }
  });
}

function submitDeleteForm(commentId) {
  const form = document.getElementById(`deleteCommentForm_${commentId}`);
  form.submit();
}