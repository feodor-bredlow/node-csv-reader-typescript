import fs from 'fs';
import https from 'https';
import { UrlParameters } from '../types/UrlParameters';
import aggregateCSVs from './aggregateCSVs';

const downloadCSVsPerRequest = (outerFolder: string, innderFolder: bigint, urls: UrlParameters) => {
    fs.promises.mkdir(`${outerFolder}/${innderFolder}`).then(() => {
        const getRequestPromise = async (url: string, index: number): Promise<void> => new Promise((resolve) => {
            https.get(url, (response) => {
                const writeStream = fs.createWriteStream(`${outerFolder}/${innderFolder}/csvData${index}.csv`);
                response.pipe(writeStream);
                writeStream.on('finish', () => {
                    resolve();
                });
            });
        });

        async function asyncGetCall(url: string, index: number) {
            await getRequestPromise(url, index);
        }

        Promise.all(
            urls.map((url, index) => asyncGetCall(url, index)),
        ).then(() => {
            aggregateCSVs(`${outerFolder}/${innderFolder}`, urls.length);
        });
    }).catch(console.error);
};

export default downloadCSVsPerRequest;
