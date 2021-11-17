import { csvRow, SpeakerStats } from '../types/types';
import addRowToSpeakerMap from './addRowToSpeakerMap';

test('correctly add new row to existing speakerMap', () => {
    const speakerMap: Map<string, SpeakerStats> = new Map();
    speakerMap.set('name1', { totalSpeeches2013: 1, securitySpeeches: 2, totalWords: 100 });
    speakerMap.set('name2', { totalSpeeches2013: 2, securitySpeeches: 3, totalWords: 200 });
    speakerMap.set('name3', { totalSpeeches2013: 2, securitySpeeches: 4, totalWords: 300 });

    const csvrow: csvRow = {
        Datum: '2013-10-30',
        Redner: 'name2',
        Thema: 'Innere Sicherheit',
        Wörter: '50',
    };

    const speakerMapExpectedResult: Map<string, SpeakerStats> = new Map();
    speakerMapExpectedResult.set('name1', { totalSpeeches2013: 1, securitySpeeches: 2, totalWords: 100 });
    speakerMapExpectedResult.set('name2', { totalSpeeches2013: 3, securitySpeeches: 4, totalWords: 250 });
    speakerMapExpectedResult.set('name3', { totalSpeeches2013: 2, securitySpeeches: 4, totalWords: 300 });

    expect(addRowToSpeakerMap(speakerMap, csvrow)).toEqual(speakerMapExpectedResult);
});
