
// Get the current page URL path
const currentPath = window.location.pathname;

// Get all navigation items
const navItems = document.querySelectorAll('.navItem');

// Loop through each navigation item
navItems.forEach(item => {
  // Get the href attribute value (page path)
  const itemPath = item.getAttribute('href');

  // Check if the current path matches the item's path
  if (currentPath === itemPath) {
    // Add the "active" class and apply the specified style
    item.classList.add('active');
    item.style.backgroundColor = '#111';
    item.style.color = '#fff';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Variable to store the last search term

  searchInput.addEventListener("keyup", function () {
    // Get the trimmed search term
    const searchTerm = searchInput.value.trim();

    // Only make the request if there's a new search term
     if (searchTerm === "") {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
      return;
    }

      // Make an AJAX request to the server to fetch search results using Axios
      axios.get(`/search/${searchTerm}`)
        .then(function (data) {
          const {users , loggedInUser} = data.data;
          displaySearchResults(users, loggedInUser);
        })
        .catch((error) => console.error("Error fetching search results:", error));
  });

  function displaySearchResults(users, loggedInUser) {
    // Clear previous results
    searchResults.innerHTML = "";
    if (users.length > 0) {
      users.forEach((user) => {
        const isCurrentUser = loggedInUser && user.username === loggedInUser.username;

        searchResults.innerHTML += `    <div class="search-user-details-container">
        <a class="userName" href="${isCurrentUser ? '/profile' : '/' + user.username }">
        <div class="search-profile-picture">
          <a class="userName" href="${isCurrentUser ? '/profile' : '/' + user.username }">
          <img src="/images/Upload/${user.dp}" alt="">
          </a>
        </div>
        <div class="search-user-details">
        <a href="${isCurrentUser ? '/profile' : '/' + user.username }">
          <div class="-search-userName">
          ${user.username}
          </div>
        </a>
        <div class="search-fullName">${user.fullname}</div>
      </div>
      </a>
      </div> <br>`;
      });
      searchResults.style.display = "block";
    } else {
      // If no users found, hide the results
      searchResults.style.display = "none";
    }
  }

});

