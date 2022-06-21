module.exports = {
    processTwitterResponse: function(responseBody){
        var tweets = [];
        let count = responseBody['meta']['result_count'].valueOf();

        // no results, return.
        if (count === 0){
            return;
        }

        // else, process the response.
        for (let i = 0; i < count; i++) {
            let created_id = responseBody['data'][i]['created_id'];
            let tweetText = responseBody['data'][i]['text'];
            let tweetID = responseBody['data'][i]['id'];

            let userID = responseBody['data'][i]['author_id'].valueOf();
            let authorID = responseBody['includes']['users'][i]['id'].valueOf();

            // by joining userID on authorID we can get the username
            // since userID and authorID represent the same value
            if(userID === authorID){
                    var userName = responseBody['includes']['users'][i]['username'];
                    console.log('Date: ' + created_id);
                    console.log('Author: ' + userName);
                    console.log('Text: ' + tweetText);
                    console.log('id: ' + tweetID);
                    // add a tweet object to the Json array
                    tweets[i] = {
                        date: created_id,
                        author: userName,
                        text: tweetText,
                        id: tweetID
                    }
                }
        }
        // return processed response.
        return tweets;
    }
}