function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validatePassword(password) {
    return password.length > 6;
  }
  
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
  
    emailError.textContent = '';
    passwordError.textContent = '';
  
    let isValid = true;
  
    if (!validateEmail(email)) {
      emailError.textContent = 'Email must contain "@" and no spaces.';
      isValid = false;
    }
  
    if (!validatePassword(password)) {
      passwordError.textContent = 'Password must be more than 6 characters.';
      isValid = false;
    }
  
    if (isValid) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      window.location.href = 'index.html'; 
    }
  });
  
  window.onload = function () {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      window.location.href = 'index.html'; 
    }
  };
