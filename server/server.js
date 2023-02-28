const express = require(`express`);
const mongoose = require(`mongoose`);
const path = require(`path`);

const app = express();

// app.use(`/`, (req, res, next) => {
//   console.log(`generic middleware`);
//   next();
// });

app.get(`/`, (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.listen(3000, () => {
  console.log(`Server now listening on port 3000`);
});
