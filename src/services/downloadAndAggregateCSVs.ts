import fs from 'fs';
import { UrlParameters } from '../types/types';
import aggregateData from '../utils/aggregateData';
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

    // 3. download CSVs per request into subfolder and create aggregated file
    await downloadCSVsPerRequest(`${CSV_FILES}/${timeStamp}`, urls);

    // 4. aggregate data of all CSV files in aggregated.csv
    await aggregateData(`${CSV_FILES}/${timeStamp}`, urls);

    return `${__dirname}/csv_files/${timeStamp}`;
};

export default downloadAndAggregateCSVs;
