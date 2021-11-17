import { ParsedQs } from 'qs';
import { UrlCheck, UrlParameters } from '../types/types';

const extractUrlsFromQuery = (query: ParsedQs): UrlCheck => {
    const urls = query.url;
    let finalUrls: UrlParameters = [];
    let valid = true;

    function validURL(str: string) {
        /* eslint-disable max-len, prefer-regex-literals */
        const pattern = new RegExp(/^(http|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/+#-]*[\w@?^=%&amp;\/+#-])+$/, 'i'); // fragment locator
        return !!pattern.test(str);
    }

    if (typeof urls === 'object') {
        finalUrls = urls as UrlParameters;
        finalUrls.forEach((url) => {
            if (!validURL(url)) valid = false;
        });
    }
    if (typeof urls === 'string') {
        finalUrls = [urls];
        if (!validURL(urls)) {
            valid = false;
        }
    }

    const response: UrlCheck = {
        urls: finalUrls,
        allValid: valid,
    };

    return response;
};

export default extractUrlsFromQuery;
