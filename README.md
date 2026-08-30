# SnapLoop

A full-stack social media web application designed to provide a modern social networking experience with user authentication, profiles, posts, stories, image uploads, and social interactions.

## Overview

SnapLoop is a full-stack social media platform built with a JavaScript-based frontend and a Node.js/Express backend. The application provides a social-media-style interface where users can interact with profiles, posts, stories, and other users.

The project demonstrates full-stack development concepts including REST APIs, authentication, database management, file uploads, input validation, and frontend DOM manipulation.

## Features

* **User Authentication** — Secure user registration and login
* **User Profiles** — Profile information and user-focused pages
* **Posts Feed** — Display posts with images, captions, likes, and comments
* **Stories** — Social-media-style stories section
* **Image Uploads** — Upload and manage user/post images
* **User Suggestions** — Discover and follow suggested users
* **Messaging Interface** — Social messaging functionality
* **Search Interface** — Search-oriented navigation
* **Authentication Tokens** — JWT-based authentication
* **Password Security** — Password hashing using bcrypt
* **Input Validation** — Server-side request validation
* **REST API** — Backend API endpoints for application functionality
* **MongoDB Database** — Persistent storage using MongoDB and Mongoose
* **CORS Support** — Cross-origin communication between frontend and backend

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Font Awesome

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT / JSON Web Tokens
* bcryptjs
* Multer
* express-validator
* CORS
* dotenv

## Architecture

SnapLoop follows a client-server architecture:

```text
┌─────────────────────────────┐
│          Frontend           │
│      HTML / CSS / JS        │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│          Backend            │
│      Node.js + Express      │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐   ┌─────────────┐
│   MongoDB   │   │    File     │
│  + Mongoose │   │   Uploads   │
└─────────────┘   └─────────────┘
```

## Project Structure

```text
SnapLoop/
│
├── frontend/
│   ├── index.html
│   ├── message.html
│   ├── profile.html
│   ├── post.html
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── ...
│
├── server/
│   ├── app.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── uploads/
│   └── ...
│
└── README.md
```

## Installation

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SnapLoop
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the server directory.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional environment variables required by the application.

### 4. Start the Backend

```bash
node app.js
```

The backend will run on the configured port.

### 5. Run the Frontend

Open the frontend using a local development server such as VS Code Live Server.

## Authentication

SnapLoop uses JWT-based authentication for managing authenticated sessions.

Passwords are securely hashed using `bcryptjs` before being stored, while JSON Web Tokens are used to authenticate protected API requests.

## File Uploads

Multer is used to handle multipart/form-data and image/file uploads.

Uploaded assets can be served through the Express backend.

## Data Validation

The backend uses `express-validator` to validate incoming requests and help ensure that submitted user data meets the required format.

## Database

MongoDB is used as the application's database, with Mongoose providing schema definitions, data modeling, and database interaction.

## Future Improvements

Possible future enhancements include:

* Real-time messaging using WebSockets
* Notifications
* Improved post recommendation algorithms
* Video uploads
* Stories expiration
* Advanced search
* Content moderation
* Improved mobile responsiveness
* Cloud-based media storage
* Deployment with production-grade infrastructure

## Learning Outcomes

Through SnapLoop, the project demonstrates practical experience with:

* Full-stack web development
* REST API development
* Node.js and Express.js
* MongoDB database integration
* JWT authentication
* Password hashing
* File upload handling
* Server-side validation
* Frontend UI development
* Client-server communication

## License

This project is intended for educational and portfolio purposes.
