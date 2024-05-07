const sequelize = require('./config/dbConfig');
const Patient = require('./models/Patient');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const Employee = require('./models/Employee');
const Rservation = require('./models/Reservation');
(async() => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    process.exit(0);
})();