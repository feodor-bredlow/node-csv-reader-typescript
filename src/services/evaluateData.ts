import fs from 'fs';
import csvParser from 'csv-parser';
import { SpeakerStats, ApiResult } from '../types/types';
import createApiResponse from './createApiResponse';

const evaluateData = (path: string, callback: (result: ApiResult) => void) => {
    // const speakerMap: Map<string, Map<string, number>> = new Map();
    const speakerMap: Map<string, SpeakerStats> = new Map();

    fs.createReadStream(`${path}/aggregated.csv`)
        .pipe(csvParser({ separator: ',' }))
        .on('data', (csvrow) => {
            const speakerName = csvrow.Redner;
            const tempSpeaker: SpeakerStats | undefined = speakerMap.get(speakerName);
            const isSecuritySpeech: boolean = csvrow.Thema === 'Innere Sicherheit';
            if (tempSpeaker) {
                speakerMap.set(
                    speakerName,
                    {
                        totalSpeeches2013: new Date(csvrow.Datum).getFullYear() === 2013
                            ? tempSpeaker.totalSpeeches2013 + 1 : tempSpeaker.totalSpeeches2013,
                        securitySpeeches: isSecuritySpeech ? tempSpeaker.securitySpeeches + 1 : tempSpeaker.securitySpeeches,
                        totalWords: tempSpeaker.totalWords + parseInt(csvrow['Wörter'], 10),
                    },
                );
            } else {
                speakerMap.set(
                    speakerName,
                    {
                        totalSpeeches2013: new Date(csvrow.Datum).getFullYear() === 2013
                            ? 1 : 0,
                        securitySpeeches: isSecuritySpeech ? 1 : 0,
                        totalWords: parseInt(csvrow['Wörter'], 10),
                    },
                );
            }
        })
        .on('end', () => {
            const apiResult = createApiResponse(speakerMap);

            callback(apiResult);
            console.log('request finished');
        });
};

export default evaluateData;
