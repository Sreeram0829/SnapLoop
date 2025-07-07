const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploads');

const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

// @route   POST api/posts
// @desc    Create a post
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { content, type } = req.body;

    const newPost = new Post({
      user: req.user.id,
      content,
      type: type || 'image', // image | reel | video
      image: req.file ? req.file.filename : null
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts
// @desc    Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', ['username', 'profilePicture']);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', ['username', 'profilePicture'])
      .populate({
        path: 'comments',
        populate: { path: 'user', select: ['username', 'profilePicture'] }
      });

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Check ownership
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift(req.user.id);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post not liked yet' });
    }

    post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Add comment
router.post('/comment/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = new Comment({
      user: req.user.id,
      post: req.params.id,
      content: req.body.content
    });

    const comment = await newComment.save();
    post.comments.unshift(comment._id);
    await post.save();

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.findById(req.params.comment_id);

    if (!comment) return res.status(404).json({ msg: 'Comment not found' });

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete comment' });
    }

    post.comments = post.comments.filter(
      commentId => commentId.toString() !== req.params.comment_id
    );
    await comment.remove();
    await post.save();

    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
