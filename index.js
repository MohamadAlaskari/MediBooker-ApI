const express = require('express');
const cors = require('cors');
const http = require('http');
const { createWebSocketServer, broadcastMessage } = require('./middlewares/Socket.js'); // Adjust the path as necessary

const app = express();
const server = http.createServer(app);

createWebSocketServer(server);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const employeesRoutes = require('./routes/employeesRoutes');
const patientsRoutes = require('./routes/patientsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Define routes
app.use('/employee', employeesRoutes);
app.use('/patient', patientsRoutes);
app.use('/service', serviceRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/reservation', reservationRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));

module.exports = { app, broadcastMessage };
