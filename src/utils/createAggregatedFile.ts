import fs from 'fs';
import removeSpaces from './removeSpaces';

const createAggregatedFile = async (path: string) => {
    const firstLine = 'Redner,Thema,Datum,Wörter\n';
    await fs.appendFile(`${path}/aggregated.csv`, firstLine, (error) => {
        if (error) { console.error('error :', error); }
    });
};

export default createAggregatedFile;
