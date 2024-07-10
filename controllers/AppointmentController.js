const { Op } = require('sequelize');

const Appointment = require('../models/Appointment');
const EmployeeToken = require('../models/EmployeeToken')
const PatientToken = require('../models/PatientToken')
const {notifappointmentupdate} = require('../middlewares/Socket.js');



async function getAllAppointments(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const patientTokenId = await PatientToken.findOne({ where: { token } });
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!patientTokenId && !employeeTokenId) {
            return res.status(404).json({ error: 'patientTokenId or employeeTokenId not found!' });
        }

        const appointments = await Appointment.findAll();
        if (!appointments) {
            return res.status(200).json("no appointments found!");
        }
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Termine:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Abrufen der Termine aufgetreten.' });
    }
}

async function getAppointmentById(req, res) {
    try {
        const { id } = req.query;

        const token = req.headers['authorization'].split(' ')[1];
        const patientTokenId = await PatientToken.findOne({ where: { token } });
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!patientTokenId && !employeeTokenId) {
            return res.status(404).json({ error: 'patientTokenId or employeeTokenId not found!' });
        }

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Termin nicht gefunden!' });
        }
        return res.status(200).json(appointment);
    } catch (error) {
        console.error("Fehler beim Abrufen des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Abrufen des Termins aufgetreten.' });
    }
}

async function createAppointment(req, res) {
    try {

        const token = req.headers['authorization'].split(' ')[1];

        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const { date, hour, description, status } = req.body;
        const appointment = await Appointment.create({ date, hour, description, status });
        notifappointmentupdate();
        return res.status(201).json(appointment);
    } catch (error) {
        console.error("Fehler beim Erstellen des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Erstellen des Termins aufgetreten.' });
    }
}

async function updateAppointment(req, res) {
    try {
        const { id } = req.query;
        const appointments = req.body;
        const token = req.headers['authorization'].split(' ')[1];

        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }
        const [appointment] = await Appointment.update(appointments, { where: { id } });

        if (appointment === 0) {
            return res.status(404).json({ error: 'Termin nicht gefunden!' });
        }
        notifappointmentupdate();
        return res.status(200).json({ message: 'appointment updated successfully' });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Aktualisieren des Termins aufgetreten.' });
    }
}

async function deleteAppointment(req, res) {
    try {
        const { id } = req.query;

        const token = req.headers['authorization'].split(' ')[1];

        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }


        const appointment = await Appointment.destroy({ where: { id } });
        if (!appointment) {
            return res.status(404).json({ error: 'Termin nicht gefunden!' });
        }
        notifappointmentupdate();
        return res.status(200).json({ message: 'Termin erfolgreich gelöscht!' });
    } catch (error) {
        console.error("Fehler beim Löschen des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Löschen des Termins aufgetreten.' });
    }
}

async function getAppointmentByDate(req, res) {
    try {
        const { date } = req.query; // Erwartet das Datum im Format 'YYYY-MM-DD'
        const token = req.headers['authorization'].split(' ')[1];

        const patientTokenId = await PatientToken.findOne({ where: { token } });
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!patientTokenId && !employeeTokenId) {
            return res.status(404).json({ error: 'patientTokenId or employeeTokenId not found!' });
        }

        const appointments = await Appointment.findAll({
            where: {
                date: {
                    [Op.startsWith]: date // Sucht nach Datumsangaben, die mit dem angegebenen Datum beginnen
                }
            }
        });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ error: 'Keine Termine für das angegebene Datum gefunden!' });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Termine nach Datum:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Abrufen der Termine nach Datum aufgetreten.' });
    }
}


async function createMultipleAppointments(req, res) {
    try {
        const appointmentsData = req.body;

        const token = req.headers['authorization'].split(' ')[1];
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const createdAppointments = [];

        for (const appointment of appointmentsData) {
            const { date, min, start, end } = appointment;
            const startTime = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]); // Startzeit in Minuten seit Mitternacht
            const endTime = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]); // Endzeit in Minuten seit Mitternacht
            const interval = parseInt(min); // Intervall in Minuten

            for (let time = startTime; time <= endTime; time += interval) { 
                const hour = Math.floor(time / 60).toString().padStart(2, '0'); // Stundenanteil berechnen und formatieren
                const minutes = (time % 60).toString().padStart(2, '0'); // Minutenanteil berechnen und formatieren
                const appointmentTime = `${hour}:${minutes}`;

                const newAppointment = await Appointment.create({
                    date,
                    hour: appointmentTime,
                    description: '',
                    status: false,
                });

                createdAppointments.push(newAppointment);
                
                if (time + interval > endTime) { 
                    break; // Schleife beenden, wenn der nächste Termin über die Endzeit hinausgehen würde
                }
            }
        }
        notifappointmentupdate();
        return res.status(201).json(createdAppointments);
    } catch (error) {
        console.error("Fehler beim Erstellen der Termine:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Erstellen der Termine aufgetreten.' });
    }
}


async function createAppointmentsForDateRange(req, res) {
    try {
        const { dateStart, dateEnd, min, start, end } = req.body;

        const token = req.headers['authorization'].split(' ')[1];
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const createdAppointments = [];

        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const formattedDate = date.toISOString().split('T')[0];
            const startTime = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]); // Startzeit in Minuten seit Mitternacht
            const endTime = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]); // Endzeit in Minuten seit Mitternacht
            const interval = parseInt(min); // Intervall in Minuten

            for (let time = startTime; time <= endTime; time += interval) { 
                const hour = Math.floor(time / 60).toString().padStart(2, '0'); // Stundenanteil berechnen und formatieren
                const minutes = (time % 60).toString().padStart(2, '0'); // Minutenanteil berechnen und formatieren
                const appointmentTime = `${hour}:${minutes}`;

                const newAppointment = await Appointment.create({
                    date: formattedDate,
                    hour: appointmentTime,
                    description: '',
                    status: false,
                });

                createdAppointments.push(newAppointment);
                
                if (time + interval > endTime) { 
                    break; // Schleife beenden, wenn der nächste Termin über die Endzeit hinausgehen würde
                }
            }
        }
        notifappointmentupdate();
        return res.status(201).json(createdAppointments);
    } catch (error) {
        console.error("Fehler beim Erstellen der Termine:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Erstellen der Termine aufgetreten.' });
    }
}


module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentByDate,
    createMultipleAppointments,
    createAppointmentsForDateRange
};