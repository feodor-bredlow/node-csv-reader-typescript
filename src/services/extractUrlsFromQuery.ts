import { ParsedQs } from 'qs';
import { UrlParameters } from '../types/UrlParameters';

const extractUrlsFromQuery = (query: ParsedQs): UrlParameters => {
    const urls = query.url;

    if (typeof urls === 'object') return urls as UrlParameters;
    if (typeof urls === 'string') return [urls];

    return [];
};

export default extractUrlsFromQuery;
