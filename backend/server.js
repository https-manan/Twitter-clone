require('dotenv').config();
const express = require('express');
const dbConnection = require('./db/connection');

const app = express();
const port = process.env.PORT || 5000;

dbConnection();

app.get('/', (req, res) => {
  res.json({ message: "Working" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
