let io;

function setIo(instance) {
    io = instance;
}

function notifyClients(event, data) {
    if (io) {
        io.emit(event, data);
    }
}

module.exports = { setIo, notifyClients };
