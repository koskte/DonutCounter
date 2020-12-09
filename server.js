const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Donut = require('./models/Donut');
const DonutPromise = require('./models/DonutPromise');
const path = require('path');
const app = express();

app.use(bodyParser.json());

const db = require('./config').mongoURI;

mongoose
  .connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.get('/getDonut', (req, res) => {
  Donut.find()
  .then(items => res.json(items));
});

app.get('/getPromise', (req, res) => {
  DonutPromise.find()
  .then(items => res.json(items));
});

app.post('/increaseAmount', (req, res) => {
  let date = new Date();
  Donut.updateOne({}, {$inc: {amount: 1}, date: date})
  .then(() => {
    Donut.find()
    .then(items => res.json(items));
  });
});

app.post('/increasePromiseAmount', (req, res) => {
  DonutPromise.updateOne({}, {$inc: {amount: 1}})
  .then(() => {
    DonutPromise.find()
    .then(items => res.json(items));
  });
});

app.post('/resetCounter', (req, res) => {
  Donut.updateOne({}, {amount: 0, date: ''})
  .then(items => res.json(items));
});

app.post('/resetPromiseCounter', (req, res) => {
  DonutPromise.updateOne({}, {amount: 0})
  .then(items => res.json(items));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 4000;

app.listen(port);