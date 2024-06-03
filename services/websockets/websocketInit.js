const socketIo = require('socket.io');
const { handleConnection } = require('./websocketHandlers');

let io;

function initializeWebSocketServer(server) {
    io = socketIo(server, {
        cors: {
            origin: "*", // In der Produktion solltest du dies spezifischer machen
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => handleConnection(socket, io));

    return io;
}

module.exports = { initializeWebSocketServer };
