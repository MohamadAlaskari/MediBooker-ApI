const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// In deiner Hauptdatei (z.B. index.js)
const sequelize = require('./config/dbConfig');

sequelize.sync().then(() => {
    console.log('Modelle wurden mit der Datenbank synchronisiert.');
}).catch((error) => {
    console.error('Synchronisierung der Modelle fehlgeschlagen:', error);
});



const employeesRoutes = require('./routes/employeesRoutes');
const patientsRoutes = require('./routes/patientsRoutes');
app.use('/employee', employeesRoutes);
app.use('/patient', patientsRoutes);


try {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
} catch (error) {
    console.error('Error occurred during database synchronization:', error);
}