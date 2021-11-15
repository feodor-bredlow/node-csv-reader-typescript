import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import evaluationHandler from './routes/evaluationHandler';

const app = express();
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

app.use('/evaluation', evaluationHandler);

const options = {
    key: fs.readFileSync(`${__dirname}/certs/key.pem`),
    cert: fs.readFileSync(`${__dirname}/certs/cert.pem`),
};

http.createServer(app).listen(HTTP_PORT, () => console.log(`Listening for http request on port ${HTTP_PORT}`));
https.createServer(options, app).listen(HTTPS_PORT, () => console.log(`Listening for secure https request on port ${HTTPS_PORT}`));
