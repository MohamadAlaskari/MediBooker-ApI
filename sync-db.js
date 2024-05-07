const sequelize = require('./config/dbConfig');
const Patient = require('./models/Patient');
const PatientToken= require('./models/PatientToken')
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const Employee = require('./models/Employee');
const Rservation = require('./models/Reservation');
(async () => {
    try {
      // Synchronisiere die Tabellen, ohne sie zu löschen und neu zu erstellen
      
      await Patient.sync();
      await PatientToken.sync();
      await Service.sync();
      await Appointment.sync();
      await Employee.sync();
      await Rservation.sync();
      
      console.log('Datenbank synchronisiert.');
      process.exit(0); // Beende den Prozess nach erfolgreicher Synchronisierung
    } catch (error) {
      console.error('Fehler beim Synchronisieren der Datenbank:', error);
      process.exit(1); // Beende den Prozess mit Fehlercode
    }
  })();


  