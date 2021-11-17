import { ParsedQs } from 'qs';
import extractUrlsFromQuery from './extractUrlsFromQuery';

test('extractUrlsFromQuery to correctly return urls and allValid flag if only one "url" parameter is present', () => {
    let queryObject: ParsedQs = { url: 'url0' };
    let urlCheck = extractUrlsFromQuery(queryObject);
    expect(urlCheck).toStrictEqual({ urls: ['url0'], allValid: false });

    queryObject = { url: 'http://www.abc.com' };
    urlCheck = extractUrlsFromQuery(queryObject);
    expect(urlCheck).toStrictEqual({ urls: ['http://www.abc.com'], allValid: true });

    queryObject = { url: 'http://www.abc.com/xyz.csv' };
    urlCheck = extractUrlsFromQuery(queryObject);
    expect(urlCheck).toStrictEqual({ urls: ['http://www.abc.com/xyz.csv'], allValid: true });
});

test('extractUrlsFromQuery to correctly return urls if valid "url" parameters are present', () => {
    const queryObject: ParsedQs = { url: ['http://www.abc.com/xyz1.csv1', 'http://www.abc.com/xyz2.csv2', 'http://www.abc.com/xyz3.csv3'], blob: 'foo' };
    expect(extractUrlsFromQuery(queryObject)).toStrictEqual({ urls: ['http://www.abc.com/xyz1.csv1', 'http://www.abc.com/xyz2.csv2', 'http://www.abc.com/xyz3.csv3'], allValid: true });
});

test('extractUrlsFromQuery to correctly return urls and unvalid boolean if unvalid "url" parameters are present', () => {
    const queryObject: ParsedQs = { url: ['http://www.abc.com/xyz1.csv1', 'url1', 'http://www.abc.com/xyz3.csv3'], blob: 'foo' };
    expect(extractUrlsFromQuery(queryObject)).toStrictEqual({ urls: ['http://www.abc.com/xyz1.csv1', 'url1', 'http://www.abc.com/xyz3.csv3'], allValid: false });
});

test('extractUrlsFromQuery to correctly return empty array if no "url" parameter is present', () => {
    const queryObject: ParsedQs = { blubb: ['url0', 'url1', 'url2'], blob: 'foo' };
    expect(extractUrlsFromQuery(queryObject)).toStrictEqual({ allValid: true, urls: [] });
});

test('extractUrlsFromQuery to correctly return empty array empty query body is present', () => {
    const queryObject: ParsedQs = {};
    expect(extractUrlsFromQuery(queryObject)).toStrictEqual({ allValid: true, urls: [] });
});
