import { ParsedQs } from 'qs';
import extractUrlsFromQuery from './extractUrlsFromQuery';

test('extractUrlsFromQuery to correctly return urls if url parameter is present', () => {
    const queryObject: ParsedQs = { url: ['url0', 'url1', 'url2'], blob: 'foo' };
    expect(extractUrlsFromQuery(queryObject)).toStrictEqual(['url0', 'url1', 'url2']);
});

test('extractUrlsFromQuery to correctly return empty array if no url parameter is present', () => {
    const queryObject: ParsedQs = { blubb: ['url0', 'url1', 'url2'], blob: 'foo' };
    expect(extractUrlsFromQuery(queryObject)).toStrictEqual([]);
});
