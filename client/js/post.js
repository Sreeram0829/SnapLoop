// client/js/post.js

const API = 'http://localhost:5000/api';
const token = localStorage.getItem('token');
if (!token) window.location.href = 'auth.html';

const postForm = document.getElementById('postForm');
const postStatus = document.getElementById('postStatus');

postForm.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('content', document.getElementById('postContent').value);
  formData.append('type', document.getElementById('postType').value);
  formData.append('media', document.getElementById('postImage').files[0]);

  try {
    const res = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: { 'x-auth-token': token },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || 'Failed to upload');

    postStatus.textContent = '✅ Post created successfully!';
    postStatus.style.color = 'green';
    postForm.reset();
  } catch (err) {
    console.error(err);
    postStatus.textContent = `❌ ${err.message}`;
    postStatus.style.color = 'red';
  }
};
