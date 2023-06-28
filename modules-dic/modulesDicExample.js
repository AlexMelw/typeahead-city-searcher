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
    "src/main": { // entry point
        module: { exports: {} },
        instance: this.instance = this.instance || (function (exports, require, module, __filename, __dirname) {
            const stylesScssPath = path.resolve(__dirname, "styles.scss");
            styleInjector(stylesScssPath);

            // import { convert, parse } from './utils/jsonConverter.js';
            // const { convert, parse } = require('src/utils/jsonConvertor');

            // import { fetchData } from 'src/utils/dataFetcher.js';
            const fetchData = require('src/utils/dataFetcher').fetchData;

            (async function () {
                const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

                const cities = [];
                const filteredCities = [];

                const data = await fetchData(endpoint);

                // for (const city of data) {
                //     cities.push(city);
                // }

                // cities.push(data[0], data[1], data[2], data[3], data[4], ..., data[data.length-1]);
                cities.push(...data);

                // console.log(cities);

                const searchNode = document.querySelector(".search-form .search");
                const suggestionsNode = document.querySelector(".search-form .suggestions");

                const getFilteredPlaces = (matchWord, cities) => {

                    const filteredCities = cities.filter((place) => {

                        const regex = new RegExp(matchWord, "gi");
                        const doesMatchSearchCondition = place.city.match(regex) || place.state.match(regex);

                        return doesMatchSearchCondition;
                    });

                    return filteredCities;
                };

                const updateSuggestions = (event) => {

                    const keyCode = event.keyCode || event.which;

                    switch (keyCode) {

                        case 38: // up arrow
                        case 40: // down arrow
                        case null:
                        case undefined:
                            return;
                    }

                    const inputNode = event.target;
                    const matchWord = inputNode.value; // cali (california)

                    const filteredPlaces = getFilteredPlaces(matchWord, cities);
                    console.log("🚀 ~ file: main.js:55 ~ updateSuggestions ~ filteredPlaces:", filteredPlaces)

                    filteredCities.length = 0;
                    filteredCities.push(...filteredPlaces);

                    const liNodes = filteredCities.map((place) => {

                        const highlightRegex = new RegExp(matchWord, "gi");

                        const city = place.city.replace(highlightRegex, `<span class="hl">${matchWord}</span>`);
                        const state = place.state.replace(highlightRegex, `<span class="hl">${matchWord}</span>`);

                        const population = place.population.replace(/\B(?=(\d{3})+(?!\d))/g, `,`);

                        return `
                <li>
                    <span class="name">${city}, ${state}</span>
                    <span class="population">${population}</span>
                </li>
            `;
                    });

                    suggestionsNode.innerHTML = liNodes.join("\n");
                };

                let currentSuggestionIndex = -1;

                const handleArrowKeysPress = (event) => {

                    const keyCode = event.keyCode || event.which;

                    const upArrowCode = 38;
                    const downArrowCode = 40;
                    const enterKeyCode = 13;

                    switch (keyCode) {
                        case upArrowCode: // up arrow
                            currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, 0);
                            break;

                        case downArrowCode: // down arrow;
                            currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, Math.max(filteredCities.length - 1, 0));
                            break;

                        case enterKeyCode: // enter
                            event.preventDefault();
                            break;

                        default:
                            return;
                    }

                    const suggestionsLiNodes = suggestionsNode.querySelectorAll("li");
                    const selectedSuggestionLiNode = suggestionsLiNodes[currentSuggestionIndex];

                    // debugger;
                    if (keyCode === enterKeyCode && selectedSuggestionLiNode != null) {

                        filteredCities.length = 0;

                        searchNode.value = selectedSuggestionLiNode.querySelector("span.name").innerText;

                        return false;
                    }

                    suggestionsLiNodes.forEach((liNode) => liNode.classList.remove("selected"));
                    selectedSuggestionLiNode.classList.add("selected");
                };

                searchNode.addEventListener("keyup", updateSuggestions);
                searchNode.addEventListener("change", updateSuggestions);

                document.addEventListener("keydown", handleArrowKeysPress);
            })();

        })(
            this.module.exports,
            require,
            this.module,
            "C:\\Users\\veaceslav.barbarii\\Desktop\\typeahead searcher\\src\\main.js",
            "C:\\Users\\veaceslav.barbarii\\Desktop\\typeahead searcher\\src\\"
        )
    }
};

// Conclusion:
// Modules are a way to split your code into separate files
// Today developers write their modules as ES modules
// Yet bundlers like Webpack, Parcel, Rollup, Vite.js, etc. would convert them to UMD modules
