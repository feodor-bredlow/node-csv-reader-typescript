import express from 'express';
import { UrlParameters } from '../types/UrlParameters';
import extractUrlsFromQuery from '../services/extractUrlsFromQuery';

export default express().get('/', (req, res) => {
    const urlParameters: UrlParameters = [];

    // 1. extract urls
    extractUrlsFromQuery(req.query);
    // defineUrlParameters(req.query)

    // 2. download CSVs
    // 3. Aggregate information
    // 4. evaluate data
    // 5. return result

    res.status(200).send('Hello evaluation from handler 2');
});
