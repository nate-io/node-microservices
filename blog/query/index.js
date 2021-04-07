const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

// in memory data for this demo
const posts = {};

/* EVENT data structure
{
  type: 'PostCreated' || 'CommentCreated',
  data: {
    id: 'string',
    content: 'string',
    postId: 'string',
  } 
}
*/

// logger 
// app.use(function(req, res, next) {
//   console.log(`${req.method} ${req.url}`);

//   next();
// });

// send all posts
app.get('/posts', (req, res) => { 
  res.send(posts);
});

// store new event which occurred
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  res.send({});
})

app.listen(4002, () => {
  console.log('Listening on 4002');
});