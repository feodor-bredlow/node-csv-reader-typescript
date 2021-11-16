import fs from 'fs';
import { UrlParameters } from '../types/types';
import downloadCSVsPerRequest from '../utils/downloadCSVsPerRequest';

const downloadAndAggregateCSVs = (urls: UrlParameters): string => {
    const CSV_FILES = `${__dirname}/csv_files`;
    const timeStamp = process.hrtime.bigint();

    if (!fs.existsSync(CSV_FILES)) {
        fs.promises.mkdir(CSV_FILES).then(() => {
            downloadCSVsPerRequest(CSV_FILES, timeStamp, urls);
        }).catch(console.error);
    } else {
        downloadCSVsPerRequest(CSV_FILES, timeStamp, urls);
    }
    return `${__dirname}/csv_files/${timeStamp}`;
};

export default downloadAndAggregateCSVs;
