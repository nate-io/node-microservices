const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

// in memory data for this demo
const posts = {};

/**
 * Handle system event by type
 * @param {string} type 
 * @param {object} data 
 */
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
}

// send all posts
app.get('/posts', (req, res) => { 
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

// start the app and fetch historical events for processing
app.listen(4002, async () => {
  console.log('Listening on 4002');

  const res = await axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log(`Processing event: ${event.type}`);

    handleEvent(event.type, event.data);
  }
});