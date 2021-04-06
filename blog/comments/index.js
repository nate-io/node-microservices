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
  console.log(`${req.method} ${req.url}`);

  next();
});

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;

  res.send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // extract and merge new comment
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { 
      id: commentId,
      content,
      postId: id
    }
  });

  res.status(201).send(commentsByPostId[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);

  res.send({});
})

app.listen(4001, () => {
  console.log('Listening on 4001');
});