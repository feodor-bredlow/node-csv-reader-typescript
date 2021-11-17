import { csvRow, SpeakerStats } from '../types/types';

const addRowToSpeakerMap = (speakerMap: Map<string, SpeakerStats>, csvrow: csvRow) => {
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
                totalWords: tempSpeaker.totalWords + parseInt(csvrow.Wörter, 10),
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
    return speakerMap;
};

export default addRowToSpeakerMap;
