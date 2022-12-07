#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require('http');

require('dotenv').config();

console.info("Starting API setup...");

const app = require('./api.js');

let server = null;
const port = normalizePort(process.env.PORT);

server = http.createServer(app);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const normalPort = parseInt(val, 10);
  if (isNaN(normalPort)) {
    // named pipe
    return val;
  }

  if (normalPort >= 0) {
    // port number
    return normalPort;
  }
  return false;
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  try {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  } catch (err) {
    console.error(`An error occurred while starting this application: ${err}`);
  }
}


app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', () => onListening(server));