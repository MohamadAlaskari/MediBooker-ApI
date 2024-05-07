const Employee = require('../models/Employee');
const bcrypt = require('bcrypt')

async function getAll(req, res) {
    try {
        const employees = await Employee.findAll();
        if (employees.length === 0) {
            return res.status(404).json({ error: 'Keine Employee gefunden!!' });;
        }
        return res.status(200).json(employees);

    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error); // Zeigt Fehlerdetails in der Konsole
        return res.status(500).json({ error: error.message || 'An error occurred while fetching data.' });
    }
}
async function signup(req, res) {
    try {
        const { name, surname, email, password,street, hNr, postcode, city } = req.body;

        // Hash das Passwort, bevor es in die Datenbank gespeichert wird
        const hashedPassword = await bcrypt.hash(password, 10);

        await Employee.create({ name, surname, email, password: hashedPassword ,street, hNr, postcode, city});

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email or insurance Number already exists!' });
        }
        console.error('Error registering Employee:', error);
        return res.status(500).json({ error: 'An error occurred while registering Employee!' });
    }
}


async function deleteEmployee(req, res) {
    try {
        const { id } = req.query;

        const deletedEmployee = await Employee.destroy({ where: { id } });

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee ient not found!' });
        }

        return res.status(200).json({ message: 'Employee deleted successfully!' });
    } catch (error) {
        console.error('Error deleting Employee:', error);
        return res.status(500).json({ error: 'An error occurred while deleting patient!' });
    }
}


async function updateEmployee(req, res) {
    try {
        const { id } = req.query; // Extrahieren der ID aus den Abfrageparametern
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const [updatedRowsCount] = await Employee.update(updates, { where: { id } });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Employee not found!' });
        }

        return res.status(200).json({ message: 'Employee updated successfully!' });
    } catch (error) {
        console.error('Error updating Employee:', error);
        return res.status(500).json({ error: 'An error occurred while updating Employee!' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ where: { email } });

        if (!employee) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password!' });
        }

        // Hier können Sie je nach Anforderung eine JWT-Authentifizierung implementieren

        return res.status(200).json({ message: 'Login successful!', employee });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'An error occurred while logging in!' });
    }
}


module.exports = {
    getAll,
    signup,
    deleteEmployee,
    updateEmployee,
    login
}