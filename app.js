const craigslist = require('node-craigslist');

function craigslistSearch(searchQuery) {
    let options = parse(searchQuery);
    let query = options['query'] || '';
    if(options['query']) {
        delete options.query;
    }
    let client = new craigslist.Client({
        city : 'toronto',
        category: 'sss',
    });
    client.search(options, query)
        .then((listings) => {
            //return listings;
            console.log(listings);
        })
        .catch((err) => {
            //return err;
            console.error(err);
        });
}

function parse(search) {
    let vars = search.substr(1).split('&');
    let queryString = {};
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        // If first entry with this name
        if (typeof queryString[pair[0]] === 'undefined') {
            queryString[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof queryString[pair[0]] === 'string') {
            let arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
            queryString[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return queryString;
}
craigslistSearch('?query=kid&hasPic=1&searchNearby=2&nearbyArea=389&nearbyArea=626&nearbyArea=482&nearbyArea=213&nearbyArea=214&nearbyArea=386');