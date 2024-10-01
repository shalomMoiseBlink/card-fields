const http = require('http');
const fs = require("fs");

const homepage = fs.readFileSync("./card.html", "utf-8");
const customJs = fs.readFileSync("./custom.js", "utf-8");
//create a server object:
http.createServer(function (req, res) {

    //Return the url part of the request object:
    
  if( req.method === "GET") {
    if ( req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(homepage);
        res.end();
    } else if (req.url === "/custom.js"){
       res.write(customJs)
       res.end();
    }  else {

        res.writeHead(302, {'Location': './'});
        res.end();
      }
    
  } else if (req.method === "POST" && req.url === "/"){
    let body = '';

    // Listen for data events to accumulate the request body
    req.on('data', chunk => {

        body += chunk.toString(); // Convert Buffer to string
    });

    // Listen for the end event to indicate the complete request has been received
    req.on('end', () => {
        const responseObj = {};
        try {
            // Parse the body as JSON
         let array = body.split("&");
         array.forEach((item)=>{
            const [field, value] = item.split("=");
            responseObj[field] = value
         })
        
        } catch (error) {
            console.error('Error parsing JSON:', error.message);
        }
        let newHomePage = homepage.split('let paymentToken = null;').join(`let paymentToken = '${responseObj.paymentToken}';`);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(newHomePage);
        res.end();
    });
 
  } else {
   
    res.writeHead(302, {'Location': './'});
    res.end();
  }
    
  }).listen(8080);