const http = require('http');
const fs = require('fs');
const url = require('url')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url,true);
  if (reqUrl.pathname === "/") {
    const htmlFile = 'index.html';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(htmlFile).pipe(res);
  } else if (reqUrl.pathname === "/api/gettweets") {
      const urlParams = reqUrl.query;
      const searchTerm = urlParams['politiker'.toString()];
      res.statusCode = 200;
      res.write("Tweets");
  } else {
      res.statusCode = 404;
      res.write("404 Not Found");
  };
  res.end();

  //res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



const riksDagRequest =  require('./riksdagsrequest.js');
const mpCount = 349;
riksDagRequest.getRiksdagsledamot().then(json => {
  console.log(json.valueOf());
  for (var i = 0; i < mpCount; i++) {
    console.log('json')
    console.log('Namn:' + json['personlista']['person'][i]['tilltalsnamn'] + ' ' + json['personlista']['person'][i]['efternamn']);
    console.log('Parti: ' + json['personlista']['person'][i]['parti']);
    console.log('NBR#' + (i + 1));
    console.log('\n');
  }
});



function setInputQuery(inputName){
  input = inputName;
}

// change value of input to get tweets where the value of input is mentioned.
setInputQuery('joe biden');



const searchtweet = require('./searchtweet.js');
searchtweet.twitterSearchQuery(input).then(json => {

var tweetCount = json['meta']['result_count'].valueOf();
console.log('\nNumber of results:  ' + tweetCount + '\n');

    for ( var i = 0; i < tweetCount; i++){
      var userID = json['data'][i]['author_id'].valueOf();
      var authorID =  json['includes']['users'][i]['id'].valueOf();

        if(userID === authorID){
          var userName = json['includes']['users'][i]['username'];
          console.log('Tweet: ' + (i + 1))
          console.log('Author: ' + userName)
        }

      console.log(json['data'][i]['text']);
      console.log('\n\n')
      }
});