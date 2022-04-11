// Example two, data is formatted inside app.js instead of in samplerequest.js
// 


const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = 'AAAAAAAAAAAAAAAAAAAAAJFyUgEAAAAAaMwvL%2F%2Ff31OxWIwx8NIWjuAUnao%3DG0EKos9pODOhj9obGSk0SHctOaGLwMmmGAi630Fg7SvAyERZOj';
// process.env.BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";


async function getTweets(fullName){
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
        console.log(returning + res.body)
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {
    try {
        // Make request
        const prompt = require('prompt-sync')();
        const fullname = prompt('Enter a full name of a Swedish politician?');
        console.log(`${fullname} selected!`);
        console.log('---------------------------------')

        const response = await getTweets(`${fullname}`);
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();

module.exports.getTweets = getTweets;

