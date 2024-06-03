const express = require('express');
const cors = require('cors');
const http = require('http');
const { initializeWebSocketServer } = require('./services/websocketService');


const app = express();
const server = http.createServer(app);


// Hier wird CORS für alle Domains erlaubt
app.use(cors());

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
const patientsRoutes = require('./routes/patientsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Parse JSON bodies
app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));

// Define routes
app.use('/patient', patientsRoutes);
app.use('/service', serviceRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/employee', employeesRoutes);
app.use('/reservation', reservationRoutes);



// Initialize WebSocket server
initializeWebSocketServer(server);

const port = 3000;
try {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
} catch (error) {
    console.error('Error occurred during database synchronization:', error);
}
