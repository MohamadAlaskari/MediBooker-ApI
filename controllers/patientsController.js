const Patient = require('../models/Patient');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/dbConfig');



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
async function signup(req, res) {
    try {
        const { name, surname, dob, email, password, phoneNr, healthInsurance, insuranceType, insuranceNr, street, hNr, postcode, city } = req.body;


        // Hash das Passwort, bevor es in die Datenbank gespeichert wird
        const hashedPassword = await bcrypt.hash(password, 10);

        await Patient.create({ name, surname, dob, email, password: hashedPassword, phoneNr, healthInsurance, insuranceType, insuranceNr, street, hNr, postcode, city });

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email or insurance Number already exists!' });
        }
        console.error('Error registering patient:', error);
        return res.status(500).json({ error: 'An error occurred while registering patient!' });
    }
}


async function deletePatient(req, res) {
    try {
        const { id } = req.query;

        const deletedPatient = await Patient.destroy({ where: { id } });

        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }

        return res.status(200).json({ message: 'Patient deleted successfully!' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        return res.status(500).json({ error: 'An error occurred while deleting patient!' });
    }
}


async function updatePatient(req, res) {
    try {
        const { id } = req.query; // Extrahieren der ID aus den Abfrageparametern
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const [updatedRowsCount] = await Patient.update(updates, { where: {id} });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Patient not found!' });
        }



        return res.status(200).json({ message: 'Patient updated successfully!' });
    } catch (error) {
        console.error('Error updating patient:', error);
        return res.status(500).json({ error: 'An error occurred while updating patient!' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const patient = await Patient.findOne({ where: { email } });

        if (!patient) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        const passwordMatch = await bcrypt.compare(password, patient.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        // Generate JWT token
        const token = jwt.sign({ patientId: patient.id, email: patient.email }, jwtSecret, { expiresIn: jwtExpiration });

        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'An error occurred while logging in!' });
    }
}





module.exports = {
    getAll,
    signup,
    deletePatient,
    updatePatient,
    login
}