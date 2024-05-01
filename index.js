const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


//routes
const patientsRoutes = require('./routes/patientsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use('/patient', patientsRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);

app.use(express.json());

// In deiner Hauptdatei (z.B. index.js)
const sequelize = require('./config/dbConfig');

sequelize.sync().then(() => {
    console.log('Modelle wurden mit der Datenbank synchronisiert.');
}).catch((error) => {
    console.error('Synchronisierung der Modelle fehlgeschlagen:', error);
});





app.use(bodyParser.json());
try {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
} catch (error) {
    console.error('Error occurred during database synchronization:', error);
}