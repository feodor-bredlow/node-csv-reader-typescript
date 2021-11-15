import fs from 'fs';
import https from 'https';
import { UrlParameters } from '../types/UrlParameters';

const downloadCSVs = (urls: UrlParameters): string => {
    const CSV_FILES = `${__dirname}/csv_files`;
    const timeStamp = process.hrtime.bigint();

    const createCsvFolderPerRequest = (outerFolder: string, innderFolder: bigint) => {
        fs.promises.mkdir(`${outerFolder}/${innderFolder}`).then(() => {
            urls.forEach((url, index) => {
                const writeStream = fs.createWriteStream(`${outerFolder}/${innderFolder}/csvData${index}.csv`);
                https.get(url, (response) => {
                    response.pipe(writeStream);
                });
            });
        }).catch(console.error);
    };

    if (!fs.existsSync(CSV_FILES)) {
        fs.promises.mkdir(CSV_FILES).then(() => {
            createCsvFolderPerRequest(CSV_FILES, timeStamp);
        }).catch(console.error);
    } else {
        createCsvFolderPerRequest(CSV_FILES, timeStamp);
    }

    return `${CSV_FILES}/${timeStamp}`;
};

export default downloadCSVs;
