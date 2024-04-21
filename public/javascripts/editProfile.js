document.querySelector("#edit-profile-img").addEventListener("click", function(){
    document.querySelector("#profile-img").click();
})

function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('selected');
    const imageBox = document.querySelector(".profile-image");

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        imageBox.style.display = 'none';
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      preview.src = '#';
      preview.style.display = 'none';
    }
  }