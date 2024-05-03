const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


//routes
const patientsRoutes = require('./routes/patientsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const employeesRoutes = require('./routes/employeesRoutes');


app.use('/patient', patientsRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/employee', employeesRoutes);


app.use(express.json());


app.use(bodyParser.json());
try {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
} catch (error) {
    console.error('Error occurred during database synchronization:', error);
}