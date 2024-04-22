const Patient = require('../models/Patient');

async function getAll(req, res) {
    try {
        const patients = await Patient.findAll();
        if (patients.length === 0) {
            return res.status(404).json({ error: 'Keine Patients gefunden!!' });;
        }
        return res.status(200).json(patients);

    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error); // Zeigt Fehlerdetails in der Konsole
        return res.status(500).json({ error: error.message || 'An error occurred while fetching data.' });
    }
}

module.exports = {
    getAll
}