// nicht mehr verwendet, ich habe es modular gemacht 

/*
const socketIo = require('socket.io');

function initializeWebSocketServer(server) {
    const io = socketIo(server, {
        cors: {
            origin: "*", // In der Produktion solltest du dies spezifischer machen
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('message', (message) => {
            console.log(`Received message: ${message}`);
            socket.emit('message', `Server received: ${message}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}

function notifyClients(event, data) {
    if (io) {
        io.emit(event, data);
    }
}

module.exports = { initializeWebSocketServer };
*/