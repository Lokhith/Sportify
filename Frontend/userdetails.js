function validateLogin() {
  // Retrieve input values
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var errorMsg = document.getElementById('error-msg');

  // Check if username and password match
  if (username === 'lokhith' && password === '12345678') {
    // Successful login, redirect or do something else
    alert('Login successful! Redirecting...');
    window.location.href = "index.html";
    return false;
  } else {
    // Invalid credentials, show error message
    errorMsg.textContent = 'Invalid username or password. Please try again.';
    return false; // Prevent form submission
  }
}
