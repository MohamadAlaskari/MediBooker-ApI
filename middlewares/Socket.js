const WebSocket = require('ws');

const clients = new Set();

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`Client connected. Total clients: ${clients.size}`);

    ws.on('message', (message) => {
      console.log(`Received message from client: ${message}`);
      broadcastMessage(message);
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log(`Client disconnected. Total clients: ${clients.size}`);
    });

    ws.on('error', (error) => {
      console.error(`Error occurred: ${error}`);
    });
  });
}

function broadcastMessage(message) {
  const jsonMessage = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonMessage);
    }
  });
}

function notifydeleteduser() {
    console.log('Broadcasting message to all clients');
    const message = JSON.stringify({ event: 'userdeleted' });
    broadcastMessage(message);
  }

module.exports = { createWebSocketServer, broadcastMessage, notifydeleteduser };
