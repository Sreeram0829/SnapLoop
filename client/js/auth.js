const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginCard = document.getElementById('loginCard');
const signupCard = document.getElementById('signupCard');

// Switch to Signup
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginCard.style.display = 'none';
  signupCard.style.display = 'block';
});

// Switch to Login
showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupCard.style.display = 'none';
  loginCard.style.display = 'block';
});

// Toggle Password Visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const inputId = icon.getAttribute('data-target');
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    icon.classList.toggle('fa-eye-slash');
  });
});

// Handle Signup
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = signupForm.signupEmail.value;
  const username = signupForm.signupUsername.value;
  const password = signupForm.signupPassword.value;
  const confirmPassword = signupForm.signupConfirmPassword.value;

  if (password !== confirmPassword) {
    return alert('Passwords do not match!');
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || 'Signup failed');
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } catch (err) {
    alert(err.message);
  }
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.loginEmail.value;
  const password = loginForm.loginPassword.value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || 'Login failed');
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } catch (err) {
    alert(err.message);
  }
});
