const Appointment = require('../models/Appointment');
const EmployeeToken = require('../models/EmployeeToken')
const PatientToken = require('../models/PatientToken')



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
        return res.status(200).json({ message: 'Termin erfolgreich gelöscht!' });
    } catch (error) {
        console.error("Fehler beim Löschen des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Löschen des Termins aufgetreten.' });
    }
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};