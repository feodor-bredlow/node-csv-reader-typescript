export type UrlParameters = string[];

export type SpeakerName = string;

export type Speech = {
    speaker: SpeakerName;
    topic: string;
    date: Date;
    words: number;
}

export type SpeakerStats = {
    totalSpeeches2013: number;
    securitySpeeches: number;
    totalWords: number;
}

export type Speakers = Record<SpeakerName, SpeakerStats>;

export type SpeakerEvaluationResult = {
    mostSpeeches2013: { name: SpeakerName[], result: number };
    mostSecurity: { name: SpeakerName[], result: number };
    leastWordy: { name: SpeakerName[], result: number };
}

export type ApiResult = {
    mostSpeeches: SpeakerName | null;
    mostSecurity: SpeakerName | null;
    leastWordy: SpeakerName | null;
}
