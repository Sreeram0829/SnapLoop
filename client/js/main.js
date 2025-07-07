const API = 'http://localhost:5000/api';
const BASE_URL = 'http://localhost:5000';

const token = localStorage.getItem('token');
if (!token) window.location.href = 'auth.html';

// DOM Elements
const postsFeed = document.getElementById('postsFeed');
const createPostModal = document.getElementById('createPostModal');
const closeModalBtn = document.querySelector('.close-modal');
const postForm = document.getElementById('postForm');
const postImageInput = document.getElementById('postImage');
const postContentInput = document.getElementById('postContent');

// Load Posts Feed
async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`, {
      headers: { 'x-auth-token': token }
    });
    const posts = await res.json();
    renderPosts(posts.reverse()); // Newest post first
  } catch (err) {
    console.error('Error loading posts:', err);
  }
}

// Render Posts to Feed
function renderPosts(posts) {
  postsFeed.innerHTML = '';
  posts.forEach(post => {
    const mediaURL = `${BASE_URL}/uploads/${post.image}`;
    const profilePic = `${BASE_URL}/uploads/${post.user.profilePicture || 'default.jpg'}`;
    const mediaType = post.type || 'image';

    let mediaElement = '';
    if (mediaType === 'image') {
      mediaElement = `<img src="${mediaURL}" alt="Post Image" class="post-image" />`;
    } else if (mediaType === 'reel' || mediaType === 'video') {
      mediaElement = `<video src="${mediaURL}" autoplay muted loop class="post-image"></video>`;
    }

    const postHTML = `
      <div class="post">
        <div class="post-header">
          <div class="post-user">
            <img src="${profilePic}" alt="User" class="post-user-avatar" />
            <span class="post-user-name">${post.user.username}</span>
          </div>
          <div class="post-options">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div class="post-media">${mediaElement}</div>
        <div class="post-actions">
          <div class="post-actions-left">
            <i class="far fa-heart"></i>
            <i class="far fa-comment"></i>
            <i class="far fa-paper-plane"></i>
          </div>
          <i class="far fa-bookmark"></i>
        </div>
        <div class="post-likes">${post.likes?.length || 0} likes</div>
        <div class="post-caption">
          <span class="post-caption-username">${post.user.username}</span>
          ${sanitizeText(post.content)}
        </div>
        <div class="post-comments">View all 23 comments</div>
        <div class="post-add-comment">
          <input type="text" placeholder="Add a comment..." />
          <button>Post</button>
        </div>
      </div>
    `;

    postsFeed.innerHTML += postHTML;
  });
}

// Sanitize Emoji & Input Text
function sanitizeText(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle Post Submit
postForm.onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData();
  const file = postImageInput.files[0];
  const fileType = file?.type || '';
  let postType = 'image';

  if (fileType.includes('video')) {
    postType = file.name.includes('reel') ? 'reel' : 'video';
  }

  formData.append('content', postContentInput.value);
  if (file) formData.append('image', file);
  formData.append('type', postType);

  try {
    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: { 'x-auth-token': token },
      body: formData
    });

    if (!res.ok) throw new Error('Failed to create post');
    alert('Post created successfully!');
    postForm.reset();
    closeModalBtn.click();
    loadPosts();
  } catch (err) {
    console.error('Post Error:', err);
    alert(err.message);
  }
};

// Emoji Picker for Post Content
function initEmojiPicker() {
  const picker = new EmojiButton({
    position: 'top-start',
    zIndex: 9999
  });

  const emojiTrigger = document.createElement('button');
  emojiTrigger.type = 'button';
  emojiTrigger.innerHTML = '😊';
  emojiTrigger.style.marginLeft = '8px';
  emojiTrigger.style.cursor = 'pointer';

  postContentInput.parentNode.insertBefore(emojiTrigger, postContentInput.nextSibling);

  emojiTrigger.addEventListener('click', () => {
    picker.togglePicker(emojiTrigger);
  });

  picker.on('emoji', emoji => {
    postContentInput.value += emoji;
  });
}

// Modal Handling
if (createPostModal && closeModalBtn) {
  closeModalBtn.onclick = () => (createPostModal.style.display = 'none');
  window.onclick = e => {
    if (e.target === createPostModal) createPostModal.style.display = 'none';
  };
}

// Init on Load
window.onload = () => {
  loadPosts();
  initEmojiPicker();
};
