  document.addEventListener('DOMContentLoaded', async () => {
    const feedContainer = document.getElementById('feedContainer');
    const loader = document.getElementById('loader');
    let selectedFolderData;
    let postsData;
    let foldersData;
    const showLoader = () => {
      loader.style.transform = 'scale(1)';
    };

    const hideLoader = () => {
      loader.style.display = 'none';
    };

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

    const fetchFeedData = async () => {
      try {
        showLoader();
        const response = await fetch('/feed', { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const data = await response.json();
        postsData = data.posts;
      } catch (error) {
        console.error('Error fetching feed data:', error);
      }finally{
        hideLoader();
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

    feedContainer.addEventListener('click', async (event) => {
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
    
    async function createFeedHTML(updatedselectedFolderData) {
      try{
        showLoader();
        if (postsData && updatedselectedFolderData && foldersData) {
          const delay = 100; // Change this value as needed
          await new Promise(resolve => setTimeout(resolve, delay));
          const postHTMLArray = postsData.map((post) => {
    
            return `
              <!-- Your updated HTML structure for each post -->
              <div class="box" onmouseover="handleHover(this, true)" onmouseout="handleHover(this, false)">
                <a href="/posts/${post._id}">
                  <div class="image-overlay"></div>
                  <img src="/images/Upload/${post.image}" class="card-img-top" loading="lazy" alt="...">
                </a>
                <div class="save-Boards">
                  <div class="userCreatedBoard">
                    <div class="boardTitle" onclick="toggleBoardsBtn(this, '${post._id}')" data-toggle-btn="0">
                      ${updatedselectedFolderData.name} <i class="ri-arrow-down-s-line"></i>
                    </div>
                    <div class="boards-list" id="Board-${post._id}"  style="z-index: 1000;">
                      <div class="header-bords-list">Save</div>
                      <div class="list-of-folder">
                        <div class="results-boards"> All boards</div>
                        ${foldersData.map(folder => `
                          <a class="boars-items" data-folder-list-id="${folder._id}">
                            ${folder.name}
                          </a>
                        `).join('')}
                        <!-- End of iteration -->
                      </div>
                    </div>
                  </div>
                  <div class="save-unsave" onchange="saveActionBtn(this, '${post._id}', '${updatedselectedFolderData}')">
                  <button type="button" class="${updatedselectedFolderData.posts && updatedselectedFolderData.posts.includes(post._id) ? 'unSave' : 'Save'}" 
                  data-post-id="${post._id}" data-folder-id="${updatedselectedFolderData._id}">
                  ${updatedselectedFolderData.posts && updatedselectedFolderData.posts.includes(post._id) ? 'Saved' : 'Save'}
                  </button>
                  </div>
                </div>
                ${post.imageLink ? `
                  <a class="Link" href="${post.imageLink}">
                    <i class="ri-arrow-right-up-line"></i>
                    <h5 class="post-link">${post.imageLink}</h5>
                  </a>` : ''}
              </div>
            `;
          });
    
          feedContainer.innerHTML = postHTMLArray.join('');
        }
      }finally {
        hideLoader();
      }
    
    }
    // Initial fetch when the page loads
    await fetchFeedData();
    await fetchUpdatedSelectedFolder();
    await fetchFolderList();
    await createFeedHTML(selectedFolderData);
  });

  function saveActionBtn(element, postId, selectedFolderData){
    let saveUnsavedBtn = element.querySelector('button');
    if(selectedFolderData.posts && selectedFolderData.posts.includes(postId)){
      saveUnsavedBtn.classList.remove('Save');
      saveUnsavedBtn.textContent.remove('Save');
      saveUnsavedBtn.classList.add('unSave');
      saveUnsavedBtn.textContent.add('unSave');

    }else{
      saveUnsavedBtn.classList.remove('unSave');
      saveUnsavedBtn.textContent.remove('unSave');
      saveUnsavedBtn.classList.add('Save');
      saveUnsavedBtn.textContent.add('Save');
    }

  }

  function handleHover(element, isMouseOver) {
    const SaveBoards = element.querySelector('.save-Boards');
    const Link = element.querySelector('.Link');

    if (SaveBoards) {
      if (isMouseOver) {
        // On hover
        SaveBoards.style.transform = 'scale(1)';
        if (Link) {
          Link.style.transform = 'scale(1)';
        }
      } else{
        // On mouseout
        SaveBoards.style.transform = 'scale(0)';
        if (Link) {
          Link.style.transform = 'scale(0)';
        }
      }
    }
  }

  function toggleBoardsBtn(element, postId) {

    const boarMenu = document.querySelector(`#Board-${postId}`);
  
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