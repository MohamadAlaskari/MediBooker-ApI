const Reservation = require('../models/Reservation');
const EmployeeToken = require('../models/EmployeeToken')
const PatientToken = require('../models/PatientToken')
const Appointment = require('../models/Appointment')
const Service = require('../models/Service')
const { Op } = require('sequelize');
const { notifyClients } = require('../services/websocketService');



async function getAll(req, res) {
    try {

        const token = req.headers['authorization'].split(' ')[1];

        // Find the patient ID using the token
        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!employeeToken) {
            return res.status(404).json({ error: 'employeeToken not found!' });
        }


        const reservations = await Reservation.findAll();
        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found!' });
        }

        notifyClients('reservationsUpdated', reservations);
        return res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return res.status(500).json({ error: 'An error occurred while fetching reservations!' });
    }
}

async function create(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        // Validate token
        const patientTokenId = await PatientToken.findOne({ where: { token } });
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!patientTokenId && !employeeTokenId) {
            return res.status(404).json({ error: 'Patient or Employee token not found!' });
        }

        const { patientId, appointmentId, serviceId } = req.body;

        if (!patientId || !appointmentId || !serviceId) {
            return res.status(400).json({ error: 'patientId, appointmentId, and serviceId are required.' });
        }

        // Finde die zukünftigen Reservierungen des Patienten
        const futureReservations = await Reservation.findAll({
            where: {
                patientId: patientId
            },
            include: [{
                model: Appointment,
                where: {
                    date: {
                        [Op.gt]: new Date() // Nur zukünftige Termine
                    }
                },
                required: true
            }]
        });

        // Überprüfe, ob der Patient bereits zwei oder mehr zukünftige Reservierungen hat
        if (futureReservations.length >= 2) {
            return res.status(400).json({ message: 'Patient darf nicht mehr als zwei zukünftige Termine haben.' });
        }

        const appointment = await Appointment.findOne({ where: { id: appointmentId } });

        if (appointment.status) {
            return res.status(404).json({ error: 'The appointment is already booked!' });
        }

        // Erstelle die neue Reservierung
        await appointment.update({ status: true });
        const newReservation = await Reservation.create({
            patientId: patientId,
            appointmentId: appointmentId,
            serviceId: serviceId
        });

        notifyClients('reservationUpdated', newReservation);
        return res.status(201).json({ message: 'Reservation updated successfully!', newReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        return res.status(500).json({ error: 'An error occurred while creating reservation!' });
    }
}


async function update(req, res) {
    try {
        const { id } = req.query;
        const { appointmentId, patientId, serviceId, ...updates } = req.body;

        // Überprüfen, ob alle erforderlichen Felder vorhanden sind
        if (!id || !appointmentId || !patientId || !serviceId) {
            return res.status(400).json({ error: 'Missing required fields!' });
        }

        // Überprüfen, ob die Reservation existiert
        const existingReservation = await Reservation.findOne({ where: { id } });
        if (!existingReservation) {
            return res.status(404).json({ error: 'Reservation not found!' });
        }


        // Aktualisieren des Appointment-Status auf false
        const existingAppointment = await Appointment.findOne({ where: { id: existingReservation.appointmentId } });
        if (!existingAppointment) {
            return res.status(404).json({ error: 'Associated appointment not found!' });
        }
        // Löschen der alten Reservation
        await existingAppointment.update({ status: false });
        await existingReservation.destroy();


        // Erstellen einer neuen Reservation
        const newReservation = await Reservation.create({
            appointmentId,
            patientId,
            serviceId,
            ...updates
        });
        const appointment = await Appointment.findOne({ where: { id: appointmentId } });

        if (appointment.status) {
            return res.status(404).json({ error: 'the Appointment is alredy booked!' });
        }
        await appointment.update({ status: true });

        notifyClients('reservationUpdated', newReservation);
        return res.status(200).json({ message: 'Reservation updated successfully!', newReservation });
    } catch (error) {
        console.error('Error updating reservation:', error);
        return res.status(500).json({ error: 'An error occurred while updating reservation!' });
    }
}


async function remove(req, res) {
    try {
        const { id } = req.query;
        const token = req.headers['authorization'].split(' ')[1];

        // Find the patient ID using the token
        const patientTokenId = await PatientToken.findOne({ where: { token } });
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });


        if (!patientTokenId && !employeeTokenId) {
            return res.status(404).json({ error: 'patientTokenId or employeeTokenId not found!' });
        }
        const deletedRowCount = await Reservation.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Reservation not found!' });
        }
        return res.status(200).json({ message: 'Reservation deleted successfully!' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        return res.status(500).json({ error: 'An error occurred while deleting reservation!' });
    }
}

async function getPatientAppointments(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        const patientToken = await PatientToken.findOne({ where: { token } });
        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!patientToken && !employeeToken) {
            return res.status(403).json({ error: 'Invalid token!' });
        }


        patientId = patientToken.patientId;  // Stellen Sie sicher, dass der Query-Parameter patientId ist
        if (!patientId) {
            return res.status(400).json({ error: 'patientId query parameter is required' });
        }

        const reservations = await Reservation.findAll({
            where: { patientId },
            include: [Appointment, Service]
        });
        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No appointments found for this patient!' });
        }


        notifyClients('patientAppointmentsUpdated', reservations);
        return res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        return res.status(500).json({ error: 'An error occurred while fetching patient appointments!' });
    }
}


module.exports = {
    getAll,
    create,
    update,
    remove,
    getPatientAppointments
};
