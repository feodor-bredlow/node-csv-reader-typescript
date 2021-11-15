import express from 'express';
import sum from './sum';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  const a: number = 1;
  const b: number = 2;
  const c = sum(a, b);
  res.status(200).send(`Hello World new ${c}`);
});

app.get('/evalutation', (req, res) => {
  res.status(200).send('Hello evaluation');
  console.log(req.query);
});

app.listen(port, () => console.log(`Running on port ${port}`));
