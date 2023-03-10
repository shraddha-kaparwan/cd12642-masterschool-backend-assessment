const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});