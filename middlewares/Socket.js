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
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function notifyemployeeupdate() {
  console.log('Broadcasting message to all clients');
  const message = 'employeearrayupdate'; 
  broadcastMessage(message);
}
function notifypatientupdate() {
  console.log('Broadcasting message to all clients');
  const message = 'patientarrayupdate'; 
  broadcastMessage(message);
}
function notifserviceupdate() {
  console.log('Broadcasting message to all clients');
  const message = 'servicesarrayupdate'; 
  broadcastMessage(message);
}
function newReservationNotif(name, date, time) {
  const message = `newreservation: New reservation for ${name} on ${date} at ${time}.`;
  broadcastMessage(message);
}

function notifappointmentupdate() {
  console.log('Broadcasting message to all clients');
  const message = 'appointmentsarrayupdate'; 
  broadcastMessage(message);
}


module.exports = { createWebSocketServer, broadcastMessage, notifyemployeeupdate,notifserviceupdate,notifypatientupdate,notifappointmentupdate,newReservationNotif };
