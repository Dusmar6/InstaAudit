const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 5000;

//create the server
const server = http.createServer(app);

server.listen(PORT);