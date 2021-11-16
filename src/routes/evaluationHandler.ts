import express from 'express';
import { UrlParameters } from '../types/types';
import extractUrlsFromQuery from '../services/extractUrlsFromQuery';
import downloadAndAggregateCSVs from '../services/downloadAndAggregateCSVs';

export default express().get('/', (req, res) => {
    console.log('test', req.query);

    // 1. extract urls
    const urlParameters: UrlParameters = extractUrlsFromQuery(req.query);
    console.log('request received for urls: ', urlParameters);

    // 2. download and aggregate CSVs
    const csvFolderPath = downloadAndAggregateCSVs(urlParameters);

    // 3. evaluate data

    // 4. return result

    res.status(200).send('Hello evaluation from handler');
});
