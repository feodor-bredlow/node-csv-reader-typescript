import fs from 'fs';
import csvParser from 'csv-parser';
import { SpeakerStats, ApiResult, csvRow } from '../types/types';
import createApiResponse from '../utils/createApiResponse';
import addRowToSpeakerMap from '../utils/addRowToSpeakerMap';

const evaluateData = (path: string, callback: (result: ApiResult) => void) => {
    // const speakerMap: Map<string, Map<string, number>> = new Map();
    let speakerMap: Map<string, SpeakerStats> = new Map();

    fs.createReadStream(`${path}/aggregated.csv`)
        .pipe(csvParser({ separator: ',' }))
        .on('data', (csvrow: csvRow) => {
            speakerMap = addRowToSpeakerMap(speakerMap, csvrow);
        })
        .on('end', () => {
            const apiResult = createApiResponse(speakerMap);

            callback(apiResult);
            console.log('request finished');
        });
};

export default evaluateData;
