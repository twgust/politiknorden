$(document).ready(function() {
    /* -------------------------------------------------------------------------- */
    /*                   getting the list of parliament members                   */
    /* -------------------------------------------------------------------------- */
	getLedamot();
    function getLedamot(){
        let url ="http://127.0.0.1:3000/api/getpolitician"
        $.ajax({
            method:'GET',
            url:url ,
            type:"JSON"
        }).done(function(data){
            let ledamot= data;
            let output= '';
			$.each(ledamot, function(i, person){

				output +=`
			<tr class='open_tweet'>
			<th scope="row" class='col1 polID'>${i}</th>
            <th scope="row" class='col1'></th>
			<td class='col2'><a class='text-decoration-none link-dark firstName'  href="#">${person.name}</a></td>
			<td class='col3'><a class='text-decoration-none link-dark secondName' href="#">${person.lastName}</a></td>
			<td class='col4'>${person.party +'  '}</td>
			</tr>
               `;
			})

		$('#memberTable').html(output);
        }).fail(function(data){
            alert("Error, No data received!");
        });
	}
    /* -------------------------------------------------------------------------- */
    /*                           opening tweets on click                          */
    /* -------------------------------------------------------------------------- */
    $( document ).on( "click",'tr[class^="open_tweet"]', function() {
        // personName = $('.firstName',this).text()+$('.secondName',this).text();
        personID = $('.polID',this).text();
        personName = $('.firstName',this).text() + " " + $('.secondName',this).text();
        tumbNail= $('.bild',this).text();
        getDetail(personID)
        getTweet(personID, personName);
    });
    /* --------------------------- Get person details --------------------------- */
    function getDetail(personID){
        let urlD= "http://127.0.0.1:3000/api/getpoliticiandetails?politiker="+ personID
        $.ajax({
            method:'GET',
            url:urlD,
            type:'JSON'
        }).done(function (data){
            let details = data;
            
            
            detail='';
            detail+= `
            <div class='card-body container bg-light  '>
            <img class= "img-thumbnail  rounded float-end " src='${details.picture}' Show image style='width:100px;'>
            <div class=" fs-5 fw-bold mt-1 mb-1">${details.name} ${details.lastName}</div> 
            <p class='fs-6 fst-italic mb-0'><span class='badge bg-secondary text-warning text-wrap fw-bold fst-normal lh-1'>Party </span> ${details.party}</p>
            <p class='fs-6 fst-italic mb-0'><span class='badge bg-secondary text-warning text-wrap fw-bold fst-normal lh-1'>Valkrets</span> ${details.valkrets}</p>
            <p class='fs-6 fst-italic mb-0'><span class='badge bg-secondary text-warning text-wrap fw-bold fst-normal lh-1'>Uppgiftkod</span> ${details.uppgiftKod}</p>
            <p class='fs-6 fst-italic mb-3'><span class='badge bg-secondary text-warning text-wrap fw-bold fst-normal lh-1'>Uppgift</span> ${details.uppgiftText}</p>
           
            </div>
           
                    `;
           
            $('#detail').html(detail);
        })
    }
    /* ------------------------- getting data from SVPOL ------------------------ */
        function svpol (){
            let url2= "http://127.0.0.1:3000/api/gettweets?politiker="+ '349'
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
                        <h6 class=' bg-light' > <span class='fs-5 fst-italic'>#svpol ${i+1}:</span> ${svtweet.text}</h6>
                        `
                    $('#svbox').html(svpolOut);
                    }
                })
            })
        }
        /* -------------------------------------------------------------------------- */
        /*                 manipulating DOM to show Tweets and picture                */
        /* -------------------------------------------------------------------------- */
        function getTweet(personID, personName) {
            
            let url ="http://127.0.0.1:3000/api/gettweets?politiker="+ personID
            $.ajax({
                method:'GET',
                url:url ,
                type:"JSON"
            }).done(function(data){
                let allTweets= data.data
                let tweetOut = '';
                /* --------------------------- if no tweets found --------------------------- */
                if (allTweets== undefined){
                    tweetOut += `
                    <div class='container bg-light '>
		            <div class="font-monospace fs-5">¤ No tweet by "${personName}" has been found.</div> 
                    <p class='fs-6'>But you won't leave empty handed. Here are some tweets from SVPOL:</p>
                    </div>
                    <div id= 'svbox' class='  pt-3 pb-3'  ></div>

                    `;

                $('#tweetbox').html(tweetOut);
                svpol();

                }else{
        /* ----------------------------- showing tweets ----------------------------- */
                $.each(allTweets, function(i,tweet){
                    if(i<5){
                    console.log(tweet);
                    tweetOut += `
                    <div class='container bg-light mb-3 ' id=''>
		            <h6 ><span class='fw-bold text-muted'>Date:</span> ${tweet.created_at} </h6> 
                    <div id=''>${tweet.text}</div> 
                    <div id=''> <span class='fw-bold text-muted'>ID:</span>${tweet.id}</div>
                    </div>

                    `;
                }

                })

                $('#tweetbox').html(tweetOut);
            }
            }).fail(function(data){
                alert("Error, No tweet received! or connection failed");
        })
       
      };

    });
