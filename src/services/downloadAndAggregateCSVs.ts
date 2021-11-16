import fs from 'fs';
import { UrlParameters } from '../types/types';
import downloadCSVsPerRequest from '../utils/downloadCSVsPerRequest';

const downloadAndAggregateCSVs = async (urls: UrlParameters): Promise<string> => {
    const CSV_FILES = `${__dirname}/csv_files`;
    const timeStamp = process.hrtime.bigint();

    // 1. create /csv_files folder in /services folder
    if (!fs.existsSync(CSV_FILES)) {
        await fs.promises.mkdir(CSV_FILES).catch(console.error);
    }

    // 2. create timestamp subfolder for csv files of this request
    await fs.promises.mkdir(`${CSV_FILES}/${timeStamp}`).catch(console.error);

    // 3. download CSVs per request into subfolder
    await downloadCSVsPerRequest(`${CSV_FILES}/${timeStamp}`, urls);

    return `${__dirname}/csv_files/${timeStamp}`;
};

export default downloadAndAggregateCSVs;
