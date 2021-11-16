import fs from 'fs';
import https from 'https';
import { UrlParameters } from '../types/types';
import aggregateCSVs from './aggregateCSVs';

const downloadCSVsPerRequest = async (path: string, urls: UrlParameters): Promise<void> => {
    const getRequestPromise = async (url: string, index: number): Promise<void> => new Promise((resolve) => {
        https.get(url, (response) => {
            const writeStream = fs.createWriteStream(`${path}/csvData${index}.csv`);
            response.pipe(writeStream);
            writeStream.on('finish', () => {
                resolve();
            });
        });
    });

    async function asyncGetCall(url: string, index: number) {
        await getRequestPromise(url, index);
    }

    return Promise.all(
        urls.map((url, index) => asyncGetCall(url, index)),
    ).then(async () => {
        aggregateCSVs(path, urls.length);
    });
};

export default downloadCSVsPerRequest;
