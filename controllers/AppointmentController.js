const Appointment = require('../models/Appointment');

async function getAllAppointments(req, res) {
    try {
        const appointments = await Appointment.findAll();
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Termine:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Abrufen der Termine aufgetreten.' });
    }
}

async function getAppointmentById(req, res) {
    try {
        const { id } = req.params;
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
        const { date, hour, description, patientId, serviceId } = req.body;
        const appointment = await Appointment.create({ date, hour, description, PatientId: patientId, ServiceId: serviceId });
        return res.status(201).json(appointment);
    } catch (error) {
        console.error("Fehler beim Erstellen des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Erstellen des Termins aufgetreten.' });
    }
}

async function updateAppointment(req, res) {
    try {
        const { id } = req.params;
        const { date, hour, description, patientId, serviceId } = req.body;
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Termin nicht gefunden!' });
        }
        appointment.date = date;
        appointment.hour = hour;
        appointment.description = description;
        appointment.PatientId = patientId;
        appointment.ServiceId = serviceId;
        await appointment.save();
        return res.status(200).json(appointment);
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Termins:", error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Aktualisieren des Termins aufgetreten.' });
    }
}

async function deleteAppointment(req, res) {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Termin nicht gefunden!' });
        }
        await appointment.destroy();
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