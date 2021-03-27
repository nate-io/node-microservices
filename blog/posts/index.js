const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

// in memory data for this demo
const posts = {
  "0664b692": {
    "id": "0664b692",
    "title": "seed data post"
  }
};

// logger 
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`);

  next();
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id, 
    title 
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});