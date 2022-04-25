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
			<tr>
			<th scope="row" class='col1'>${i}</th>
			<td class='col2'><a class='text-decoration-none link-dark' href="#">${person.tilltalsnamn}</a></td>
			<td class='col3'><a class='text-decoration-none link-dark' href="#">${person.efternamn}</a></td>
			<td class='col4'><a >${person.parti +'  '}</a> </td>
			</tr>
               `;
			})

		$('#memberTable').html(output);
        }).fail(function(data){
            console.log("Error");
        });
	}
});