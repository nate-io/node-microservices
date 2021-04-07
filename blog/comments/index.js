const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

// in memory data for this demo
const commentsByPostId = {};

// logger 
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url} ${req.body?.data?.type}`);

  next();
});

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;

  console.log(commentsByPostId);

  res.send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // extract and merge new comment
  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { 
      id: commentId,
      content,
      postId: id,
      status: 'pending'
    }
  });

  res.status(201).send(commentsByPostId[id]);
});

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
      }
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});