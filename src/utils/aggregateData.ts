import fs from 'fs';
import removeSpaces from './removeSpaces';
import { UrlParameters } from '../types/types';

const aggregateData = async (path: string, urls: UrlParameters) => {
    const postToAggregateFile = async (aPath: string, index: number): Promise<void> => new Promise((resolve) => {
        let fileRowsNoSpace: string;
        fs.readFile(`${path}/csvData${index}.csv`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            fileRowsNoSpace = removeSpaces(data, false);

            fs.appendFile(`${path}/aggregated.csv`, fileRowsNoSpace, (errInner) => {
                if (errInner) console.error(errInner);
                resolve();
            });
        });
    });

    async function asyncAggregate(aPath: string, index: number) {
        await postToAggregateFile(aPath, index);
    }

    return Promise.all(
        urls.map((_, index) => asyncAggregate(path, index)),
    );
};

export default aggregateData;
