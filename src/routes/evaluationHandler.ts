import express from 'express';
import { UrlParameters } from '../types/UrlParameters';
import extractUrlsFromQuery from '../services/extractUrlsFromQuery';
import downloadCSVs from '../services/downloadCSVs';

export default express().get('/', (req, res) => {
    console.log(req.query);

    // 1. extract urls
    const urlParameters: UrlParameters = extractUrlsFromQuery(req.query);

    // 2. download CSVs
    const csvPath = downloadCSVs(['https://fid-recruiting.s3-eu-west-1.amazonaws.com/politics.csv', 'https://fid-recruiting.s3-eu-west-1.amazonaws.com/politics.csv']);

    // 3. Aggregate information

    // step 2 and 3 could for improved efficiency also be merged into one step

    // 4. evaluate data
    // 5. return result

    res.status(200).send('Hello evaluation from handler 2');
});
