module.exports = {
    processTwitterResponse: function(responseBody){
        var tweets = [];
        let count = responseBody['meta']['result_count'].valueOf();

        for (let i = 0; i < count; i++) {
            let created_id = responseBody['data'][i]['created_id'];
            let tweetText = responseBody['data'][i]['text'];
            let tweetID = responseBody['data'][i]['id'];

            let userID = responseBody['data'][i]['author_id'].valueOf();
            let authorID = responseBody['includes']['users'][i]['id'].valueOf();


            if(userID === authorID){
                    var userName = responseBody['includes']['users'][i]['username'];
                    console.log('Date: ' + created_id);
                    console.log('Author: ' + userName);
                    console.log('Text: ' + tweetText);
                    console.log('id: ' + tweetID);
                    tweets[i] = {
                        date: created_id,
                        author: userName,
                        text: tweetText,
                        id: tweetID
                    }
                }
                //console.log(responseBody['data'][i]['text']);
                console.log('\n\n')
        }
    }
}