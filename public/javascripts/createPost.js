document.querySelector("#imageBox").addEventListener("click", function(){
    document.querySelector("#imageInput").click();
})

document.querySelector("#imagePreview").addEventListener("click", function(){
  document.querySelector("#imageInput").click();
});

let previousImageSrc = '#';
function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('imagePreview');
    const imageBox = document.querySelector("#imageBox");

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        imageBox.style.display = 'none';

        previousImageSrc = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      preview.src = previousImageSrc;
      const hiddenInput = document.getElementById('imageInput');
      hiddenInput.value = previousImageSrc;
      setTimeout(function () {
        document.querySelector("#imageInput").click();
      }, 100); // You can adjust the delay time as needed
    }
  }

