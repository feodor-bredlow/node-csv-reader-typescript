import express from 'express';
import evaluationHandler from './routes/evaluationHandler';

const app = express();
const port = 3000;

app.use('/evaluation', evaluationHandler);

app.listen(port, () => console.log(`Running on port ${port}`));
