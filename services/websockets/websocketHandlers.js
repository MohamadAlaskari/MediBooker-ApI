function handleConnection(socket, io) {
    console.log('New client connected');

    socket.on('message', (message) => handleMessage(socket, message));
    socket.on('disconnect', handleDisconnect);
}

function handleMessage(socket, message) {
    console.log(`Received message: ${message}`);
    socket.emit('message', `Server received: ${message}`);
}

function handleDisconnect() {
    console.log('Client disconnected');
}

module.exports = { handleConnection };
