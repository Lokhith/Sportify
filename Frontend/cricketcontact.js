
function handleSubmit() {
  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const location = document.getElementById('location').value;
  const contactTime = document.getElementById('contact-time').value;
  const messageDiv = document.getElementById('message');

  if (!name || !mobile || !email || !location || !contactTime) {
    messageDiv.innerHTML = '<p style="color: red;">All fields are required.</p>';
  } else {
    messageDiv.innerHTML = '<p style="color: green;">Our executive will contact you shortly.</p>';
  }
}
  