import fs from 'fs';
import csvParser from 'csv-parser';
import { SpeakerEvaluationResult, SpeakerStats, ApiResult } from '../types/types';

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
            const result: SpeakerEvaluationResult = {
                mostSpeeches2013: { name: [''], result: 0 },
                mostSecurity: { name: [''], result: 0 },
                leastWordy: { name: [''], result: Number.MAX_SAFE_INTEGER },
            };

            speakerMap.forEach((speakerStats, speaker) => {
                // update mostSpeeches
                if (result.mostSpeeches2013.result < speakerStats.totalSpeeches2013) {
                    result.mostSpeeches2013.result = speakerStats.totalSpeeches2013;
                    result.mostSpeeches2013.name = [speaker];
                } else if (result.mostSpeeches2013.result === speakerStats.totalSpeeches2013) {
                    result.mostSpeeches2013.name.push(speaker);
                }

                // update mostSecurity
                if (result.mostSecurity.result < speakerStats.securitySpeeches) {
                    result.mostSecurity.result = speakerStats.securitySpeeches;
                    result.mostSecurity.name = [speaker];
                } else if (result.mostSecurity.result === speakerStats.securitySpeeches) {
                    result.mostSecurity.name.push(speaker);
                }

                // update leastWordy
                if (result.leastWordy.result > speakerStats.totalWords) {
                    result.leastWordy.result = speakerStats.totalWords;
                    result.leastWordy.name = [speaker];
                } else if (result.leastWordy.result === speakerStats.totalWords) {
                    result.leastWordy.name.push(speaker);
                }
            });

            const apiResult: ApiResult = {
                mostSpeeches: result.mostSpeeches2013.name.length === 1 ? result.mostSpeeches2013.name[0] : null,
                mostSecurity: result.mostSecurity.name.length === 1 ? result.mostSecurity.name[0] : null,
                leastWordy: result.leastWordy.name.length === 1 ? result.leastWordy.name[0] : null,
            };

            callback(apiResult);
            console.log('request finished');
        });
};

export default evaluateData;
