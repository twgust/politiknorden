const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
// process.env.BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

module.exports.twitterSearchQuery = twitterSearchQuery;

async function twitterSearchQuery(fullName){
    console.log(`\nRetrieving data from Twitter's API ...`);
    console.log(`Twitter Search Query: ` + fullName);
    var timeStart = Date.now();

    const params = {
        // https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
        'query': `${fullName} (lang:sv) -is:retweet`,
        'tweet.fields': 'created_at',
        'expansions': 'author_id',
        'user.fields': 'description'
    }
    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`

        }
    })

    if(res.body){
        var timeEnd = Date.now();
        var totalTime = (timeEnd - timeStart);
        console.log(`\nSuccessfully retrieved data from Twitter's API in ` + (totalTime / 1000)
        +  ' seconds!');
        console.log(`Search results: ` + res.body['meta']['result_count']);
        //console.log('returning' + res.body['data'])
        return res.body;

    } else {
        throw new Error('Unsuccessful request');
    }
}
