import removeSpaces from './removeSpaces';

test('if removeSpaces removes correctly spaces from csv file WITH first line', () => {
    const dataInit = 'Redner, Thema, Datum, Wörter\nAlexander Abel, Bildungspolitik, 2012 - 10 - 30, 5310\nBernhard Belling, Kohlesubventionen, 2012 - 11 - 05, 1210\nCaesare Collins, Kohlesubventionen, 2012 - 11 - 06, 1119\nAlexander Abel, Innere Sicherheit, 2012 - 12 - 11, 911';
    const dataFinal = 'Redner,Thema,Datum,Wörter\nAlexander Abel,Bildungspolitik,2012 - 10 - 30,5310\nBernhard Belling,Kohlesubventionen,2012 - 11 - 05,1210\nCaesare Collins,Kohlesubventionen,2012 - 11 - 06,1119\nAlexander Abel,Innere Sicherheit,2012 - 12 - 11,911';

    expect(removeSpaces(dataInit, true)).toStrictEqual(dataFinal);
});

test('if removeSpaces removes correctly spaces from csv file WITHOUT first line', () => {
    const dataInit = 'Redner, Thema, Datum, Wörter\nAlexander Abel, Bildungspolitik, 2012 - 10 - 30, 5310\nBernhard Belling, Kohlesubventionen, 2012 - 11 - 05, 1210\nCaesare Collins, Kohlesubventionen, 2012 - 11 - 06, 1119\nAlexander Abel, Innere Sicherheit, 2012 - 12 - 11, 911';
    const dataFinal = 'Alexander Abel,Bildungspolitik,2012 - 10 - 30,5310\nBernhard Belling,Kohlesubventionen,2012 - 11 - 05,1210\nCaesare Collins,Kohlesubventionen,2012 - 11 - 06,1119\nAlexander Abel,Innere Sicherheit,2012 - 12 - 11,911';

    expect(removeSpaces(dataInit, false)).toStrictEqual(dataFinal);
});
