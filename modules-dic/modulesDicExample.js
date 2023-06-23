const require = (moduleName) => {
    const moduleMap = moduleDictionary[moduleName];

    if (moduleMap) {
        
        const instance = moduleMap.instance;

        return instance.module.exports;
    }

    throw new Error(`Module ${moduleName} not found`);
}

const moduleDictionary = {
    "src/utils/dataFetcher": {
        module: { exports: {} },
        instance: this.instance = this.instance || (function (exports, require, module, __filename, __dirname) {
            // Your code here
        })
        (
            this.module.exports,
            require, 
            this.module,
            "C:\\Users\\veaceslav.barbarii\\Desktop\\typeahead searcher\\src\\utils\\dataFetcher.js",
            "C:\\Users\\veaceslav.barbarii\\Desktop\\typeahead searcher\\src\\utils\\"
            ),
    },
    "src/utils/jsonConvertor": {
        module: { exports: convert },
        instance: this.instance = this.instance || (function (exports, require, module, __filename, __dirname) {

            // import dependency
            const dataFetcher = require('src/utils/dataFetcher');

            const convert = (data) => {

                const fetchData = dataFetcher.fetchData;

                // use dependency
                fetchData('https://jsonplaceholder.typicode.com/todos/1')

                return data;
            };

            const parse = (data) => {
                // some code
            };

            module.exports = {
                // convert: convert
                parse,
                convert
            };
        })(
            this.module.exports,
            require, 
            this.module,
            "C:\\Users\\veaceslav.barbarii\\Desktop\\typeahead searcher\\src\\utils\\jsonConvertor.js",
            "C:\\Users\\veaceslav.barbarii\\Desktop\\typeahead searcher\\src\\utils\\"
            )
    },
}

// Conclusion:
// Modules are a way to split your code into separate files
// Today developers write their modules as ES modules
// Yet bundlers like Webpack, Parcel, Rollup, Vite.js, etc. would convert them to UMD modules
