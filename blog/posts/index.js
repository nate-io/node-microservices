const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

// in memory data for this demo
const posts = {
  // "0664b692": {
  //   "id": "0664b692",
  //   "title": "seed data post"
  // }
};

// logger 
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`);

  next();
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, 
    title 
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title }
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('VERSION 55 😎');
  console.log('Listening on 4000');
});