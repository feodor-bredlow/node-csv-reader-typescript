import { ApiResult, SpeakerEvaluationResult, SpeakerStats } from '../types/types';

const createApiResponse = (aSpeakerMap: Map<string, SpeakerStats>): ApiResult => {
    const result: SpeakerEvaluationResult = {
        mostSpeeches2013: { name: [''], result: 0 },
        mostSecurity: { name: [''], result: 0 },
        leastWordy: { name: [''], result: Number.MAX_SAFE_INTEGER },
    };

    aSpeakerMap.forEach((speakerStats, speaker) => {
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

    return apiResult;
};

export default createApiResponse;
