const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const htmlFile = 'index.html';
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(htmlFile).pipe(res);
  //res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const riksDagRequest =  require('./riksdagsrequest.js');
riksDagRequest.getRiksdagsledamot().then(json => {
  for (var i = 0; i < 349; i++) {
    console.log(json['personlista']['person'][i]['tilltalsnamn'] + ' ' +  
      json['personlista']['person'][i]['efternamn'] +' ' + 
      json['personlista']['person'][i]['parti'] + ' :' + i);
  }
});
