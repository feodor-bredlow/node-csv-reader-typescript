import { ParsedQs } from 'qs';
import { UrlParameters } from '../types/UrlParameters';

const extractUrlsFromQuery = (query: ParsedQs): UrlParameters => {
    const urls = query.url;

    if (urls) return urls as UrlParameters;
    return [];
};

export default extractUrlsFromQuery;
