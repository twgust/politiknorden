const https = require('http');
//const convert = require('xml-js');

module.exports = {
    getRiksdagsledamot: function(channelID) {
        //return a Promise object
        return new Promise(function (resolve, reject) {
            const options = {
                host: 'data.riksdagen.se',
                path: '/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista='
            };
            const xmlOptions = {ignoreComment: true, alwaysChildren: false};
            const req = https.request(options, res => {
                res.on('data', function (data) {
                    //convert the result to a JSON object
                    let result = data
                    resolve(result);
                });
                res.on('end', function () {

                });
                res.on('error', function(error) {
                    reject(error);
                })
          
            });
            req.end();

        });
    }
}
