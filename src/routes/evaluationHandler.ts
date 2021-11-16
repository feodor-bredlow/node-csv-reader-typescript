import express from 'express';
import fs from 'fs';
import { UrlParameters } from '../types/types';
import extractUrlsFromQuery from '../services/extractUrlsFromQuery';
import downloadAndAggregateCSVs from '../services/downloadAndAggregateCSVs';
import evaluateData from '../services/evaluateData';

export default express().get('/', async (req, res) => {
    // 1. extract urls
    const urlParameters: UrlParameters = extractUrlsFromQuery(req.query);
    console.log('request received for urls: ', urlParameters);

    // 2. download and aggregate CSVs
    const path = await downloadAndAggregateCSVs(urlParameters);

    // 3. evaluate data
    //     // const result = evaluateData(path);
    // });

    // 4. return result

    res.status(200).send('Hello evaluation from handler');
});
