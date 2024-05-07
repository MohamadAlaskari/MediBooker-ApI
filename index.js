const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Routes
const patientsRoutes = require('./routes/patientsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const employeesRoutes = require('./routes/employeesRoutes');

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use('/patient', patientsRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/employee', employeesRoutes);

try {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
} catch (error) {
    console.error('Error occurred during database synchronization:', error);
}
