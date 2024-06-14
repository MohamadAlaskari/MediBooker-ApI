const sequelize = require('./config/dbConfig');
const Patient = require('./models/Patient');
const PatientToken = require('./models/PatientToken');
const EmployeeToken = require("./models/EmployeeToken");
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const Employee = require('./models/Employee');
const Rservation = require('./models/Reservation');
(async () => {
    try {

        await Rservation.drop();
        await PatientToken.drop();
        await EmployeeToken.drop();
        await Appointment.drop();
        await Service.drop();
        await Patient.drop();
        await Employee.drop();


        console.log('Datenbank synchronisiert.');
        process.exit(0); // Beende den Prozess nach erfolgreicher Synchronisierung
    } catch (error) {
        console.error('Fehler beim Synchronisieren der Datenbank:', error);
        process.exit(1); // Beende den Prozess mit Fehlercode
    }
})();



