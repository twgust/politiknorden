


module.exports  = {
    processRiksdagResponse: function(personList){
        var politicians = [];
        for (var i = 0; i < 349; i++) {
            politicians[i] ={
                id: i,
                name: personList['personlista']['person'][i]['tilltalsnamn'],
                lastName: personList['personlista']['person'][i]['efternamn'],
                party: personList['personlista']['person'][i]['parti'],
            }
        }
        return politicians;
    }

}


