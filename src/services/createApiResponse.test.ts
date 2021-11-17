import createApiResponse from './createApiResponse';
import { SpeakerStats } from '../types/types';

test('create correct api response based on speakerMap input', () => {
    let speakerMap: Map<string, SpeakerStats> = new Map();
    speakerMap.set('name1', { totalSpeeches2013: 1, securitySpeeches: 2, totalWords: 100 });
    speakerMap.set('name2', { totalSpeeches2013: 2, securitySpeeches: 3, totalWords: 200 });
    speakerMap.set('name3', { totalSpeeches2013: 2, securitySpeeches: 4, totalWords: 300 });
    expect(createApiResponse(speakerMap)).toEqual({ leastWordy: 'name1', mostSecurity: 'name3', mostSpeeches: null });

    speakerMap = new Map();
    speakerMap.set('name1', { totalSpeeches2013: 1, securitySpeeches: 20, totalWords: 300 });
    speakerMap.set('name2', { totalSpeeches2013: 3, securitySpeeches: 3, totalWords: 300 });
    speakerMap.set('name3', { totalSpeeches2013: 2, securitySpeeches: 4, totalWords: 300 });
    expect(createApiResponse(speakerMap)).toEqual({ leastWordy: null, mostSecurity: 'name1', mostSpeeches: 'name2' });
});
