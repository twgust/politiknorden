

module.exports = {
    getPoliticianDetails: function(personList, id) {
        if (id > 348) {
            return null;
        }
        else {
            return {
                id: id,
                name: personList['personlista']['person'][id]['tilltalsnamn'],
                lastName: personList['personlista']['person'][id]['efternamn'],
                party: personList['personlista']['person'][id]['parti'],
                picture: personList['personlista']['person'][id]['bild_url_80'],
                valkrets: personList['personlista']['person'][id]['valkrets'],
                uppgiftKod: personList['personlista']['person'][id]['personuppgift']['uppgift'][0]['kod'],
                uppgiftText: personList['personlista']['person'][id]['personuppgift']['uppgift'][0]['uppgift'][0]
            };
        }

    }
}

