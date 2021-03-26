const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

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

app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // extract and merge new comment
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  res.status(201).send(commentsByPostId[id]);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});