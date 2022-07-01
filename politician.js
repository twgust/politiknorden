


module.exports  = {
    processRiksdagResponse: function(personList){
        var politicians = [];
        for (var i = 0; i < 349; i++) {
            politicians[i] ={
                id: i,
                name: personList['personlista']['person'][i]['tilltalsnamn'],
                lastName: personList['personlista']['person'][i]['efternamn'],
                party: personList['personlista']['person'][i]['parti'],
                picture: personList['personlista']['person'][i]['bild_url_80']
            }
        }
        return politicians;
    }

}


