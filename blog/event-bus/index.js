const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

// logger 
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`);

  next();
});

// event emitter
app.post('/events', (req, res) => {
  const event = req.body;
  const listeners = [
    'http://localhost:4000/events',
    'http://localhost:4001/events',
    'http://localhost:4002/events',
    'http://localhost:4003/events',
  ];

  listeners.forEach(listener => {
    axios.post(listener, event);
  })

  res.status(200).send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
})