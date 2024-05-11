const Patient = require('../models/Patient');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const PatientToken = require('../models/PatientToken')
const EmployeeToken = require('../models/EmployeeToken')
const { findPatientIdByToken } = require('../middlewares/authenticateToken');

const { jwtSecret, jwtExpiration } = require('../middlewares/tockenService');



async function getAll(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        // Find the patient ID using the token
        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!employeeToken) {
            return res.status(404).json({ error: 'Patient not found!' });
        }

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

        const token = req.headers['authorization'].split(' ')[1];

        // Find the patient ID using the token
        const patientTokenId = await PatientToken.findOne({ where: { token } });
        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });



        if (!patientTokenId && !employeeTokenId) {
            return res.status(404).json({ error: 'Patient jhfjhfjhgk found!' });
        }


        const deletedPatient = await Patient.destroy({ where: { id: id } });

        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }

        // Delete patient's token
        await PatientToken.destroy({ where: { token } });

        return res.status(200).json({ message: 'Patient deleted successfully!' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        return res.status(500).json({ error: 'An error occurred while deleting patient!' });
    }
}
async function updatePatient(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1]; // Extrahieren des Tokens aus dem Header
        const updates = req.body;

        // Find the patient ID using the token
        const patientToken = await PatientToken.findOne({ where: { token } });
        if (!patientToken) {
            return res.status(404).json({ error: 'Patient not found!' });
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const [updatedRowsCount] = await Patient.update(updates, { where: { id: patientToken.patientId } });

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
        //console.log(patient)
        if (!patient) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        const passwordMatch = await bcrypt.compare(password, patient.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }
        await patient.update({ active: true });
        // Generate random token
        const token = jwt.sign({}, jwtSecret, { expiresIn: jwtExpiration });

        // Erstellen Sie das PatientToken-Objekt und übergeben Sie die patientId explizit
        await PatientToken.create({ token, patientId: patient.id });

        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'An error occurred while logging in!' });
    }
}

async function logout(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        // Find the patient ID using the token
        const patientToken = await PatientToken.findOne({ where: { token } });
        if (!patientToken) {
            return res.status(404).json({ error: 'Patient not found!' });
        }
        const patient = await Patient.findOne({ where: { id: patientToken.patientId } });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }
        await PatientToken.destroy({ where: { token } });
        // Update the patient's activity status to false
        await patient.update({ active: false });

        return res.status(200).json({ message: 'Logout successful!' });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ error: 'An error occurred while logging out!' });
    }
}






module.exports = {
    getAll,
    signup,
    deletePatient,
    updatePatient,
    login,
    logout
}