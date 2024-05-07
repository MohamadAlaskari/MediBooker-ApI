const Reservation = require('../models/Reservation');

async function getAll(req, res) {
    try {
        const reservations = await Reservation.findAll();
        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found!' });
        }
        return res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return res.status(500).json({ error: 'An error occurred while fetching reservations!' });
    }
}

async function create(req, res) {
    try {
        const newReservation = await Reservation.create(req.body);
        return res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        return res.status(500).json({ error: 'An error occurred while creating reservation!' });
    }
}

async function update(req, res) {
    try {
        const { id, ...updates } = req.body;
        const [updatedRowsCount] = await Reservation.update(updates, { where: { id } });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Reservation not found!' });
        }
        return res.status(200).json({ message: 'Reservation updated successfully!' });
    } catch (error) {
        console.error('Error updating reservation:', error);
        return res.status(500).json({ error: 'An error occurred while updating reservation!' });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.body;
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

module.exports = {
    getAll,
    create,
    update,
    remove
};
