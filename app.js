import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();

import photoRoutes from './routes/photoRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.use('/api/photos', photoRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});