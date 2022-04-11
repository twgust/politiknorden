import './riksdagsrequest.js'

const mpCount = 349;
riksDagRequest.getRiksdagsledamot().then(json => {
  console.log(json.valueOf());
  for (var i = 0; i < mpCount; i++) {
    console.log('Namn:' + json['personlista']['person'][i]['tilltalsnamn'] + ' ' + json['personlista']['person'][i]['efternamn']);
    console.log('Parti: ' + json['personlista']['person'][i]['parti']);
    console.log('\n');
  }
});

const searchtweet = require('./searchtweet.js');
searchtweet.twitterSearchQuery(input).then(json => {

var tweetCount = json['meta']['result_count'].valueOf();
console.log('\nNumber of results:  ' + tweetCount + '\n');

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