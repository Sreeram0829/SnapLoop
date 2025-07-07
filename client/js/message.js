const chatList = document.getElementById('chatList');
const chatAvatar = document.getElementById('chatAvatar');
const chatUsername = document.getElementById('chatUsername');
const chatStatus = document.getElementById('chatStatus');
const chatBody = document.getElementById('chatBody');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

const fakeChats = [
  {
    username: 'ella.snap',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'Online',
    messages: ['Hey there!', 'Wanna catch up later?', '🌸']
  },
  {
    username: 'coffee.rain',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    status: 'Offline',
    messages: ['Check your email!', 'Done?', 'Let me know!']
  },
  {
    username: 'moonlight.xo',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    status: 'Online',
    messages: ['Movie night?', 'Popcorn ready? 🎬']
  },
  {
    username: 'sketch.vibe',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    status: 'Online',
    messages: ['Just posted a new sketch 🎨']
  },
  {
    username: 'tech.sam',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'Online',
    messages: ['Loved your SnapLoop layout!']
  },
  {
    username: 'music.mind',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    status: 'Offline',
    messages: ['This lo-fi beat hits 🎧']
  },
  {
    username: 'gamerqueen',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    status: 'Online',
    messages: ['Lobby open. Join quick!']
  },
  {
    username: 'foodie.raj',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    status: 'Online',
    messages: ['Craving biryani rn 😋']
  },
  {
    username: 'sandy.sunset',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    status: 'Offline',
    messages: ['Miss our old beach walks 🌅']
  },
  {
    username: 'coder.ana',
    avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
    status: 'Online',
    messages: ['Need help with JS bugs! 😩']
  },
  {
    username: 'editor.max',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    status: 'Online',
    messages: ['Let’s collab on the next edit.']
  },
  {
    username: 'dreamer.jay',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    status: 'Offline',
    messages: ['New poem dropping soon ✍️']
  }
];

let currentChat = null;

function renderChatList() {
  chatList.innerHTML = '';
  fakeChats.forEach(chat => {
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-user';
    userDiv.innerHTML = `
      <img src="${chat.avatar}" />
      <div>
        <h4>${chat.username}</h4>
        <p>${chat.messages[chat.messages.length - 1]}</p>
      </div>
    `;
    userDiv.onclick = () => openChat(chat, userDiv);
    chatList.appendChild(userDiv);
  });
}

function openChat(chat, element) {
  currentChat = chat;

  // Header update
  chatAvatar.src = chat.avatar;
  chatUsername.textContent = chat.username;
  chatStatus.textContent = chat.status;

  messageInput.disabled = false;
  sendMessageBtn.disabled = false;

  // Mark active chat
  document.querySelectorAll('.chat-user').forEach(user => user.classList.remove('active'));
  element.classList.add('active');

  // Render messages
  renderMessages(chat.messages);
}

function renderMessages(messages) {
  chatBody.innerHTML = '';
  messages.forEach(text => {
    const msgDiv = document.createElement('div');
    msgDiv.className = text.from === 'me' ? 'message sent' : 'message received';
    msgDiv.textContent = text.text || text;
    chatBody.appendChild(msgDiv);
  });
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Handle sending messages
sendMessageBtn.onclick = () => {
  const text = messageInput.value.trim();
  if (!text || !currentChat) return;

  currentChat.messages.push({ from: 'me', text });
  renderMessages(currentChat.messages);
  messageInput.value = '';
};

renderChatList();
