function togglePasswordVisibility() {
    const passwordField = document.getElementById('passwordField');
    const passwordIcon = document.querySelector('.toggle-password');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordIcon.classList.remove("ri-eye-off-fill");
      passwordIcon.classList.add("ri-eye-fill");
    } else {
      passwordField.type = 'password';
      passwordIcon.classList.remove("ri-eye-fill");
      passwordIcon.classList.add("ri-eye-off-fill");
    }
  }

  // Function to check if the password and confirm password match
  function validatePassword() {
    const password = document.getElementById('passwordField').value;
    const confirmPassword = document.getElementById('confirmPasswordField').value;
    const errorContainer = document.getElementById('passwordError');

    if (password !== confirmPassword) {
      errorContainer.innerHTML = 'Password and Confirm Password do not match.';
      return false; // Cancel the form submission
    }

    errorContainer.innerHTML = ''; // Clear previous error message
    return true; // Proceed with form submission
  }

  // Your existing toggleConfirmPasswordVisibility function
  function toggleConfirmPasswordVisibility() {
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const confirmPasswordIcon = document.querySelector('.toggle-confirm-password');

    if (confirmPasswordField.type === 'password') {
      confirmPasswordField.type = 'text';
      confirmPasswordIcon.classList.remove('ri-eye-off-fill');
      confirmPasswordIcon.classList.add('ri-eye-fill');
    } else {
      confirmPasswordField.type = 'password';
      confirmPasswordIcon.classList.remove('ri-eye-fill');
      confirmPasswordIcon.classList.add('ri-eye-off-fill');
    }
  }

  