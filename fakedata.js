const Faker = require('faker');
const { sequelize } = require('./config/dbConfig');
const Appointment = require('./models/Appointment');
const Patient = require('./models/Patient');
const Employee = require('./models/Employee');
const Service = require('./models/Service');
const Reservation = require('./models/Reservation');

const generatePatients = async () => {
    // Generate 10 random patients
    const patients = [];
    for (let i = 0; i < 10; i++) {
        const patient = await Patient.create({
            name: Faker.name.findName(),
            surname: Faker.name.lastName(),
            dob: Faker.date.past(),
            email: Faker.internet.email(),
            password: Faker.internet.password(),
            phoneNr: Faker.phone.phoneNumber(),
            healthInsurance: Faker.company.companyName(),
            insuranceNr: Faker.random.alphaNumeric(10),
            insuranceType: Faker.random.arrayElement(['public', 'private']),
            street: Faker.address.streetName(),
            hNr: Faker.random.number({ min: 1, max: 99 }),
            postcode: Faker.address.zipCode(),
            city: Faker.address.city(),
            active: false,
        });
        patients.push(patient);
    }
    return patients;
};
const generateEmployees = async () => {
    // Generate 10 random employee
    const employees = [];
    for (let i = 0; i < 10; i++) {
        const employee = await Employee.create({
            name: Faker.name.findName(),
            surname: Faker.name.lastName(),
            email: Faker.internet.email(),
            password: Faker.internet.password(),
            street: Faker.address.streetName(),
            hNr: Faker.random.number({ min: 1, max: 99 }),
            postcode: Faker.address.zipCode(),
            city: Faker.address.city(),
            active: false,
        });
        employees.push(employee);
    }
    return employees;
};
const generateAppointments = async () => {
    const appointments = [];
    for (let i = 0; i < 10; i++) {
        const appointment = await Appointment.create({
            date: Faker.date.future(),
            hour: Faker.random.arrayElement(['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']),
        });
        appointments.push(appointment);
    }
    return appointments;
};
const generateServices = async () => {
    const services = [];
    for (let i = 0; i < 5; i++) {
        const service = await Service.create({
            type: Faker.random.arrayElement(['checkup', 'treatment', 'surgery', 'consultation']),
            description: Faker.lorem.sentence(),
        });
        services.push(service);
    }
    return services;
};
const generateReservations = async (appointments, patients, services) => {
    for (const appointment of appointments) {
        const randomPatient = Faker.random.arrayElement(patients);
        const randomService = Faker.random.arrayElement(services);
        await Reservation.create({
            appointmentId: appointment.id,
            patientId: randomPatient.id,
            serviceId: randomService.id,
        });
    }
};

const generateData = async () => {

    await sequelize.sync();

    const patients = await generatePatients();
    const employee = await generateEmployees();
    const services = await generateServices();
    const appointments = await generateAppointments();
    await generateReservations(appointments, patients, employee, services);

    console.log('Data generation complete!');
    process.exit();
};

generateData();