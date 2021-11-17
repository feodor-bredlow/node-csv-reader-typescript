import express from 'express';
import { ApiResult } from '../types/types';
import extractUrlsFromQuery from '../services/extractUrlsFromQuery';
import downloadAndAggregateCSVs from '../services/downloadAndAggregateCSVs';
import evaluateData from '../services/evaluateData';

export default express().get('/', async (req, res) => {
    // 1. extract urls
    const extractUrlResponse = extractUrlsFromQuery(req.query);
    console.log('request received for urls: ', extractUrlResponse.urls);

    if (extractUrlResponse.allValid) {
        // 2. download and aggregate CSVs
        const path = await downloadAndAggregateCSVs(extractUrlResponse.urls);

        // 3. evaluate data and send Response
        const sendResponse = (result: ApiResult) => res.status(200).send(result);
        evaluateData(path, sendResponse);
    } else {
        res.status(500).send('please provide valid url(s) as parameters');
    }
});
