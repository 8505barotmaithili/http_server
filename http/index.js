// Import the http module
const http = require('http');

// Create server
const server = http.createServer((req, res) => {
   console.log('Hello world!');
  res.write('Hello ');
  res.write('world!');
  res.end(); // Must call this to send the response
 
});

// Set port and start server

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});





