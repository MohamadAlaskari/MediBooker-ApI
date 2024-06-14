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


    await Patient.sync({ force: true });
    await Employee.sync({ force: true });
    await PatientToken.sync({ force: true });
    await EmployeeToken.sync({ force: true });
    await Service.sync({ force: true });
    await Appointment.sync({ force: true });
    await Rservation.sync({ force: true });


    console.log('Datenbank synchronisiert.');
    process.exit(0); // Beende den Prozess nach erfolgreicher Synchronisierung
  } catch (error) {
    console.error('Fehler beim Synchronisieren der Datenbank:', error);
    process.exit(1); // Beende den Prozess mit Fehlercode
  }
})();



