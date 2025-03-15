const http = require('http');
const server=http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);

// create server is a method that creates a server object
// the server object can listen to ports on a computer
// having callback function with request and response parameters
// the response object can send a response to the client
// the response object can send a status code, content type, and data
// the response object can end the response process
// the server object can listen to a port on the computer
// the listen method can take a port number as an argument