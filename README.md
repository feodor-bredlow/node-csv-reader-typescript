# Node CSV Reader Typescript

This is a node/typescript app writen in node 16 which offers a /GET endpoint '/evaluation' and takes one or multiple urls as url parameters. Valid url parameters should point to a CSV file with a predefined structure (see below for details). 
The app will then download the CSV file(s) and run some evaluation on them and provide the result as JSON response.

### Endpoint with exemplary parameters
The app listens on the ports 80 (http) and 443 (https) for the following endpoint with some exemplary url 'url' parameters:
```
GET /evaluation?url=https://www.abc.com/file1.csv&url=https://www.xyz.com/file2.csv
```
One up to many url 'url' parameters are accepted.

### Required CSV structure of provided url addresses 
The provided urls should point to csv files (utf-8 encoded) with the following structure and comma (',') as delimiter:
```
Redner, Thema, Datum, Wörter
Prename1 Name1, Topic 1, 2012-02-01, 1234
Prename2 Name2, Topic 2, 2013-02-01, 3456
Prename3 Name3, Topic 3, 2014-02-01, 7891
Prename1 Name1, Topic 2, 2015-02-01, 2345
```

### Response
All CSV files will be downloaded, aggregated and evaluated. The following three evaluations will be made for each request:
- Who gave the most speeches in 2013?
- Who gave the most speeches about 'Innere Sicherheit'?
- Who used the fewest words?

Exemplary response with status code 200:
```JSON
{
    "mostSpeeches": "Prename1 Name1",
    "mostSecurity": null,
    "leastWordy": "Prename2 Name2"
}
```

The provided urls are checked for their form and if at least one url is not in a valid url format the app will respond with a 500 status code.

## How to run the app on localhost?
1) clone repo
2) cd node-csv-reader-typescript
3) npm install
4) add cert.pem and key.pem files to folder /__dirname/dist/certs for configuring the encrypted https connection (eather by creating self-signed certificate or using one provided by a certificat authority)
5) npm run start
5b) alternatively: npm run dev for development (runs nodemon) 
6) call http://localhost/evaluation&url=url1&... or https://localhost/evaluation&url=url1&...

### Possible improvements and next steps 
- The expected CSV structure currently is hardcoded. This could possibly be handled more dynamic with a config file or through a post call for example in order to allow flexible usage of the input structure
- Improve validation of the provided urls: currently urls are checked with a RegEx but there is no validation that checks if the provided url really points to a valid CSV file in the correct structure
- Improve error handling (related to the previous point): catch possible errors which could arise and log/display them  (possible from broken link, wrong file format, incorrect link, etc.) to avoid app crashes
- Clean up downloaded files: currently all CSV files are downloaded and copied to a aggregation file. There is no clean up mechanism yet in place which deletes old files. Old files could potentially be send to a database, deleted, etc. in order to avoid using up to much disk space. 