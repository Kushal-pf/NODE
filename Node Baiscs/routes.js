
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const msg = decodeURIComponent(parsedBody.split('=')[1]);

            fs.writeFile('message.txt', msg, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/html');
                    res.write('<html><body><h1>Internal Server Error</h1></body></html>');
                    return res.end();
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

        return;
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Not Found</h1></body></html>');
    res.end();
};

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// }


// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

// create server is a method that creates a server object
// the server object can listen to ports on a computer
// having callback function with request and response parameters
// the response object can send a response to the client
// the response object can send a status code, content type, and data
// the response object can end the response process
// the server object can listen to a port on the computer
// the listen method can take a port number as an argument