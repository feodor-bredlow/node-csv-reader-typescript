import fs from 'fs';
import removeSpaces from './removeSpaces';

const aggregateCSVs = async (path: string, numberOfFiles: number) => {
    const firstLine = 'Redner,Thema,Datum,Wörter\n';
    fs.appendFile(`${path}/aggregated.csv`, firstLine, (error) => {
        if (error) { console.error('error :', error); } else {
            for (let i = 0; i < numberOfFiles; i++) {
                /* eslint-disable no-await-in-loop */
                fs.readFile(`${path}/csvData${i}.csv`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    const fileRowsNoSpace = removeSpaces(data, false);
                    fs.appendFile(`${path}/aggregated.csv`, fileRowsNoSpace, (errInner) => {
                        if (errInner) console.error(errInner);
                    });
                });
            }
        }
    });
};

export default aggregateCSVs;
