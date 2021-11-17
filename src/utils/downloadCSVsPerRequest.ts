import fs from 'fs';
import https from 'https';
import { UrlParameters } from '../types/types';
import createAggregatedFile from './createAggregatedFile';

const downloadCSVsPerRequest = async (path: string, urls: UrlParameters): Promise<void> => {
    const getRequest = async (url: string, index: number): Promise<void> => new Promise((resolve) => {
        https.get(url, (response) => {
            const writeStream = fs.createWriteStream(`${path}/csvData${index}.csv`);
            response.pipe(writeStream);
            writeStream.on('finish', () => {
                resolve();
            });
        });
    });

    async function asyncDownload(url: string, index: number) {
        await getRequest(url, index);
    }

    return Promise.all(
        urls.map((url, index) => asyncDownload(url, index)),
    ).then(() => {
        createAggregatedFile(path);
    });
};

export default downloadCSVsPerRequest;
