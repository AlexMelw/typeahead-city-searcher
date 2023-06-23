const dataFetcher = require('./dataFetcher');

const convert = (data) => {

    const fetchData = dataFetcher.fetchData;

    // some code
    fetchData('https://jsonplaceholder.typicode.com/todos/1')

    return data;
}

const parse = (data) => {
    // some code
}

// exports.convert = convert;

module.exports = {
    convert,
    parse
};
