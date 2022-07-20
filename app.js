const http = require('http');
const fs = require('fs');
const url = require('url');
const searchTweet = require('./searchtweet.js');
const processTweet = require('./twitter');
const politicianDetails = require('./politicianDetails.js');

const hostname = '127.0.0.1';
const port = 3000;
let riksdagenJSON;
let riksdagenJSONProcessed;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url,true);
  async function writeResponseFromFile(path) {
    res.write(await fileStreamPromise(path))
    res.end();
  }

  if (reqUrl.pathname === "/") {
    const htmlFile = 'index.html';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    writeResponseFromFile(htmlFile);
  }
  else if (reqUrl.pathname === "/index.js"){
    const indexjs = "index.js";
    res.statusCode = 200;
    writeResponseFromFile(indexjs);
  }
  else if (reqUrl.pathname === "/main.js"){
    const mainjs = "main.js";
    res.statusCode = 200;
    writeResponseFromFile(mainjs);
  }


  //gets json object of tweets from Twitter API via searchtweet.js and processes it for our own API with twitter.js
  else if (reqUrl.pathname === "/api/gettweets") {
    const urlParams = reqUrl.query;
    const polID = urlParams['politiker'];
    let searchTerm;
    //if polID is invalid search for tweets mentioning 'svpol'
    if (polID > 348) {
      searchTerm = "svpol"
    }
    //if polID is valid search for tweets mentioning the politician corresponding to that ID
    else if (polID < 349) {
      console.log(urlParams['politiker']);
      const currPolitician = riksdagenJSONProcessed[urlParams['politiker']];
      searchTerm = currPolitician['name'] + " " + currPolitician['lastName'];
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    searchTweet.twitterSearchQuery(searchTerm).then(responseBody=>{
    res.end(JSON.stringify(responseBody));
      processTweet.processTwitterResponse(responseBody);
    });
  }

  else if (reqUrl.pathname === "/api/getpolitician"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(riksdagenJSONProcessed));
  }

  else if (reqUrl.pathname === "/api/getpoliticiandetails"){
    const urlParams = reqUrl.query;
    const polID = urlParams['politiker'];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(politicianDetails.getPoliticianDetails(riksdagenJSON, polID)));
  }


  else {
      res.statusCode = 404;
      res.write("404 Not Found");
      res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  onStart();
});

function onStart(){
  const politician = require('./politician.js');
  const getPoliticians = require('./riksdagsrequest.js');
  getPoliticians.getRiksdagsledamot().then(responseBody => {
      riksdagenJSON = responseBody;
      riksdagenJSONProcessed = politician.processRiksdagResponse(responseBody);
    });
}

function fileStreamPromise(path) {
  return new Promise((resolve, reject) => {
  let stream = fs.createReadStream(path);
  let data = "";
  stream.on("data", chunk => data += chunk);
  stream.on("end", () => resolve(data));
  stream.on("error", error => reject(error));
  });
}

/*
Code example:
Code retrieves the following:
First and last name of an MP
Political party 


const riksDagRequest =  require('./riksdagsrequest.js');
const mpCount = 349;
riksDagRequest.getRiksdagsledamot().then(json => {
  console.log(json.valueOf());
  for (var i = 0; i < mpCount; i++) {
    console.log('Namn:' + json['personlista']['person'][i]['tilltalsnamn'] + ' ' + json['personlista']['person'][i]['efternamn']);
    console.log('Parti: ' + json['personlista']['person'][i]['parti']);
    console.log('\n');
  }
});

*/ 


/*
Code example:
Code retrieves the following 
Author name 
Content of the tweet

User name is retrieved by "joining" userID and authorID where they are equal, similar to join statements in sql.
select Data.Tweets, User.Username
from Data 
join User on Data.authorID=User.userID;


console.log('\nNumber of results:  ' + tweetCount + '\n');
const searchtweet = require('./searchtweet.js');

searchtweet.twitterSearchQuery(input).then(json => {
var tweetCount = json['meta']['result_count'].valueOf();
    for ( var i = 0; i < tweetCount; i++){

      var userID = json['data'][i]['author_id'].valueOf();
      var authorID =  json['includes']['users'][i]['id'].valueOf();

        if(userID === authorID){
          var userName = json['includes']['users'][i]['username'];
          console.log('Author: ' + userName)
        }

      console.log(json['data'][i]['text']);
      console.log('\n\n')
      }
});
*/