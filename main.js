$(document).ready(function() {
    
	getLedamot();
    function getLedamot(){
        let url ="http://127.0.0.1:3000/api/getpolitician"
        $.ajax({
            method:'GET',
            url:url ,
            type:"JSON"
        }).done(function(data){
            let ledamot= data.personlista.person;
            let output= '';
            
			$.each(ledamot, function(i, person){

				output +=`
			<tr class='open_tweet'>
			<th scope="row" class='col1'>${i}</th>
			<td class='col2'><a class='text-decoration-none link-dark firstName'  href="#">${person.tilltalsnamn}</a></td>
			<td class='col3'><a class='text-decoration-none link-dark secondName' href="#">${person.efternamn}</a></td>
			<td class='col4'>${person.parti +'  '}</td>
			</tr>
               `;
               
			})

		$('#memberTable').html(output);
        }).fail(function(data){
            alert("Error, No data received!");
        });
	}
  
    $( document ).on( "click",'tr[class^="open_tweet"]', function() {
        personName = $('.firstName',this).text()+$('.secondName',this).text();
        getTweet(personName);
    });

        function getTweet(personName) {
            let url ="http://127.0.0.1:3000/api/gettweets?politiker="+ personName
            $.ajax({
                method:'GET',
                url:url ,
                type:"JSON"
            }).done(function(data){
                let allTweets= data.data
                let tweetOut = '';

                if (allTweets== undefined){
                    tweetOut += `
                    <div class='container bg-light mb-3' id=''>
		            <h6> ### </h6>  <div id=''>No Tweets Found </div> <div id=''></div>
                    </div>

                    `;

                $('#tweetbox').html(tweetOut);
                }else{

                
                $.each(allTweets, function(i,tweet){

                    tweetOut += `
                    <div class='container bg-light mb-3' id=''>
		            <h6> ${tweet.created_at} </h6>  <div id=''>${tweet.text}</div> <div id=''>id = ${tweet.id}</div>
                    </div>

                    `;

                })

                $('#tweetbox').html(tweetOut);
                console.log(allTweets);
            }
            }).fail(function(data){
                alert("Error, No tweet received!");
        })
       
      };

    });
