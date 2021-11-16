const removeSpaces = (csvData: string, keepFirstLine: boolean): string => {
    if (keepFirstLine) {
        return csvData.toString().split('\n').map((row) => row.split(', ').join(',')).join('\n');
    }
    const csvAsString = csvData.toString().split('\n');
    csvAsString.splice(0, 1);
    return csvAsString.map((row) => row.split(', ').join(','))
        .join('\n');
};

export default removeSpaces;
