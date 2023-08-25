import { handler } from './build/handler.js';
import express from 'express';
import { configDotenv } from "dotenv"

configDotenv()
const app = express();

app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

app.use(handler);
app.listen(8099, () => {
  console.log('listening on port 8099');
});