const API = 'http://localhost:5000/api';
const BASE_URL = 'http://localhost:5000';

const token = localStorage.getItem('token');
if (!token) window.location.href = 'auth.html';

// DOM Elements
const profileAvatar = document.getElementById('profileAvatar');
const profileUsername = document.getElementById('profileUsername');
const profileBio = document.getElementById('profileBio');
const profileStats = {
  posts: document.getElementById('postsCount'),
  followers: document.getElementById('followersCount'),
  following: document.getElementById('followingCount')
};
const profilePostsGrid = document.getElementById('profilePostsGrid');
const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileModal = document.getElementById('editProfileModal');
const closeModalBtn = document.querySelector('.close-modal');
const editProfileForm = document.getElementById('editProfileForm');
const logoutBtn = document.getElementById('logoutBtn');
const mediaTabs = document.querySelectorAll('.media-tab');

let allPosts = [];
let activeMediaType = 'image';

// Load profile and posts
async function loadProfile() {
  try {
    const res = await fetch(`${API}/users/me`, {
      headers: { 'x-auth-token': token }
    });

    const user = await res.json();
    if (!user || !user.username) throw new Error('Invalid user data received');

    const profilePic = user.profilePicture && user.profilePicture !== 'default.jpg'
      ? `${BASE_URL}/uploads/${user.profilePicture}`
      : `${BASE_URL}/uploads/default.jpg`;

    profileAvatar.src = profilePic;
    profileUsername.textContent = user.username;
    profileBio.textContent = user.bio || 'No bio added';
    profileStats.posts.textContent = user.posts?.length || 0;

    // Show fake followers/following counts
    profileStats.followers.textContent = '90';
    profileStats.following.textContent = '90';

    // Pre-fill edit form
    document.getElementById('editUsername').value = user.username || '';
    document.getElementById('editFullName').value = user.fullName || '';
    document.getElementById('editBio').value = user.bio || '';

    allPosts = user.posts || [];
    renderPostsByType(activeMediaType);

  } catch (err) {
    console.error('Error loading profile:', err);
    alert('Failed to load profile. Please try again.');
  }
}

// Render posts filtered by type
function renderPostsByType(type) {
  profilePostsGrid.innerHTML = '';

  const filtered = allPosts.filter(post => post.type === type);
  if (filtered.length === 0) {
    profilePostsGrid.innerHTML = `<p style="text-align:center; color:#888;">No ${type}s yet.</p>`;
    return;
  }

  filtered.forEach(post => {
    const div = document.createElement('div');
    div.className = 'grid-post';

    let mediaElement = '';
    if (type === 'image') {
      mediaElement = `<img src="${BASE_URL}/uploads/${post.image}" alt="Post Image" />`;
    } else if (type === 'reel' || type === 'video') {
      mediaElement = `<video src="${BASE_URL}/uploads/${post.image}" autoplay muted loop></video>`;
    }

    div.innerHTML = `
      ${mediaElement}
      <div class="grid-post-overlay">
        <i class="fas fa-heart"></i> <span>${post.likes?.length || 0}</span>
      </div>
      <div class="post-actions" style="text-align:center; padding: 0.5rem 0; font-size: 1.2rem;">
        ❤️ &nbsp;&nbsp; 💬 &nbsp;&nbsp; 📤
      </div>
    `;
    profilePostsGrid.appendChild(div);
  });
}

// Tab click handling
mediaTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mediaTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeMediaType = tab.dataset.type;
    renderPostsByType(activeMediaType);
  });
});

// Edit profile submit
editProfileForm.onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData(editProfileForm);

  try {
    const res = await fetch(`${API}/users/me`, {
      method: 'PUT',
      headers: { 'x-auth-token': token },
      body: formData
    });

    if (!res.ok) throw new Error('Failed to update profile');
    alert('Profile updated successfully!');
    editProfileModal.style.display = 'none';
    loadProfile();
  } catch (err) {
    console.error('Edit profile error:', err);
    alert(err.message);
  }
};

// Modal open/close
editProfileBtn.onclick = () => (editProfileModal.style.display = 'flex');
closeModalBtn.onclick = () => (editProfileModal.style.display = 'none');
window.onclick = e => {
  if (e.target === editProfileModal) {
    editProfileModal.style.display = 'none';
  }
};

// Logout
logoutBtn.onclick = () => {
  localStorage.removeItem('token');
  window.location.href = 'auth.html';
};

// Init
window.onload = () => {
  loadProfile();
};
