const Service = require('../models/Service');
const bcrypt = require('bcrypt');
const EmployeeToken = require('../models/EmployeeToken')
const {notifserviceupdate} = require('../middlewares/Socket.js');

async function getAllServices(req, res) {
    try {
        const services = await Service.findAll();
        if (services.length === 0) {
            return res.status(404).json({ error: 'Keine Dienste gefunden!' });
        }
        return res.status(200).json(services);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        return res.status(500).json({ error: error.message || 'Ein Fehler ist beim Abrufen der Daten aufgetreten.' });
    }
}

async function addService(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const { type, description } = req.body;
        await Service.create({ type, description });
        notifserviceupdate();
        return res.status(201).json({ message: 'Dienst erfolgreich hinzugefügt!' });
    } catch (error) {
        console.error('Error adding service:', error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Hinzufügen des Dienstes aufgetreten!' });
    }
}

async function updateService(req, res) {
    try {
        const { id } = req.query; // Lesen der ID aus den Abfrageparametern
        const updates = req.body;

        const token = req.headers['authorization'].split(' ')[1];
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const [updatedRowsCount] = await Service.update(updates, { where: { id } });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Dienst nicht gefunden!' });
        }
        notifserviceupdate();
        return res.status(200).json({ message: 'Dienst erfolgreich aktualisiert!' });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Dienstes:', error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Aktualisieren des Dienstes aufgetreten!' });
    }
}




async function deleteService(req, res) {
    try {
        const { id } = req.query; // Lesen der ID aus den Abfrageparametern

        const token = req.headers['authorization'].split(' ')[1];
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        if (!id) {
            return res.status(400).json({ error: 'Die ID wurde nicht bereitgestellt!' });
        }
        const deletedRowsCount = await Service.destroy({ where: { id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Dienst nicht gefunden!' });
        }
        notifserviceupdate();
        return res.status(200).json({ message: 'Dienst erfolgreich gelöscht!' });
    } catch (error) {
        console.error('Fehler beim Löschen des Dienstes:', error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Löschen des Dienstes aufgetreten!' });
    }
}

async function getServiceById(req, res) {
    try {
        const { id } = req.query; // Änderung: Lesen der ID aus den Abfrageparametern

        const token = req.headers['authorization'].split(' ')[1];
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Dienst nicht gefunden!' });
        }
        return res.status(200).json(service);
    } catch (error) {
        console.error('Fehler beim Abrufen des Dienstes:', error);
        return res.status(500).json({ error: 'Ein Fehler ist beim Abrufen des Dienstes aufgetreten!' });
    }
}



module.exports = {
    getAllServices,
    addService,
    getServiceById,
    updateService,
    deleteService
};