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

        function svpol (){
            let url2= "http://127.0.0.1:3000/api/gettweets?politiker="+ 'svpol'
            $.ajax({
                method:'GET',
                url:url2,
                type:'JSON'
            }).done(function (data){
                let svepol=data.data;
                svpolOut='';
                $.each(svepol, function(i,svtweet){
                    if(i<5){
                        svpolOut +=`
                        <h6 class=' bg-light' > <span class='fs-5'>#svpol ${i+1}:</span> ${svtweet.text}</h6>
                        `
                    $('#svbox').html(svpolOut);
                    }
                })
            })
        }
        function getTweet(personName) {
            var personNameWithSpaces = personName.replace(/([a-zåäö])([A-ZÅÄÖ])/g, '$1 $2');
            personNameWithSpaces = personNameWithSpaces.replace(/([A-ZÅÄÖ])([A-ZÅÄÖ][a-zåäö])/g, '$1 $2');
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
                    <div class='container bg-light  '>
		            <h6 > --§-- </h6>  <div class="font-monospace fs-4">No tweet by "${personNameWithSpaces}" has been found.</div> 
                    <p class='fs-5'>But you won't leave empty handed. Here are some tweets from SVPOL:</p>
                    <div >--§--</div>
                    </div>
                    <div id= 'svbox' class='container shadow  pt-3 pb-3'  ></div>

                    `;

                $('#tweetbox').html(tweetOut);
                svpol();

                
                }else{

                
                $.each(allTweets, function(i,tweet){
                    if(i<5){

                    tweetOut += `
                    <div class='container bg-light mb-3 ' id=''>
		            <h6 ><span class='fw-bold text-muted'>Date:</span> ${tweet.created_at} </h6>  <div id=''>${tweet.text}</div> <div id=''> <span class='fw-bold text-muted'>ID:</span>${tweet.id}</div>
                    </div>

                    `;
                }

                })

                $('#tweetbox').html(tweetOut);
            }
            }).fail(function(data){
                alert("Error, No tweet received!");
        })
       
      };

    });
