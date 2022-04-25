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
			let personout='';
            let allparti= []
            let output= '';

            $.each(ledamot, function(i, person){
				if(!allparti.includes(person.parti)){
                allparti.push(person.parti)}});

				personout +=`
				
				`

			$.each(allparti, function(i,parti){

            output +=`
			
			<h2 class="accordion-header" id="accordionhead">

            	<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}" id="partinamn">
            	<strong>${parti}</strong>
            	</button>
				</h2>
		<div id="collapse${i}" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
		  <table class="table">
			  <thead>
				<tr>
				  <th scope="col">Index</th>
				  <th scope="col">Namn</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <th scope="row" id="">1</th>
				  <td>example1</td>${
                $.each(ledamot, function (i,person){
                    if(person.parti===parti){
                        console.log(person.tilltalsnamn)
                    }
                })}
				</tr>
				<tr>
				  <th scope="row" id="">2</th>
				  <td>example2</td>
				</tr>
				<tr>
				  <th scope="row" id="">3</th>
				  <td >example3</td>
				</tr>
			  </tbody>
			</table>
		</div>
               `;
            })
            $('#accordionItem').html(output);
        }).fail(function(data){
            console.log("Error");
        });
    }
});