const Employee = require('../models/Employee');
const bcrypt = require('bcrypt')
const EmployeeToken = require('../models/EmployeeToken')
const jwt = require('jsonwebtoken');
const {notifyemployeeupdate} = require('../middlewares/Socket.js');

const { jwtSecret, jwtExpiration } = require('../middlewares/tockenService');

async function getAll(req, res) {
    try {

        const token = req.headers['authorization'].split(' ')[1];

        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });


        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

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
        const { name, surname, email, password, street, hNr, postcode, city } = req.body;

        // Hash das Passwort, bevor es in die Datenbank gespeichert wird
        const hashedPassword = await bcrypt.hash(password, 10);

        await Employee.create({ name, surname, email, password: hashedPassword, street, hNr, postcode, city });
        notifyemployeeupdate();
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

        const token = req.headers['authorization'].split(' ')[1];

        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });

        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }

        const deletedEmployee = await Employee.destroy({ where: { id } });

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee ient not found!' });
        }
        notifyemployeeupdate();
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

        const token = req.headers['authorization'].split(' ')[1];

        const employeeTokenId = await EmployeeToken.findOne({ where: { token } });


        if (!employeeTokenId) {
            return res.status(404).json({ error: 'employeeTokenId not found!' });
        }


        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const [updatedRowsCount] = await Employee.update(updates, { where: { id } });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Employee not found!' });
        }
        notifyemployeeupdate();
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
        await employee.update({ active: true });
        // Generate random token
        const token = jwt.sign({}, jwtSecret, { expiresIn: jwtExpiration });

        await EmployeeToken.create({ token, employeeId: employee.id });

        setTimeout(() => deleteExpiredToken(token), 60 * 60 * 1000); //60 min


        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'An error occurred while logging in!' });
    }
}
async function deleteExpiredToken(token) {
    try {
        await EmployeeToken.destroy({ where: { token } });
    
    } catch (error) {
        console.error(error);
    }
}

async function logout(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        // Find the patient ID using the token
        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!employeeToken) {
            return res.status(404).json({ error: 'Employee not found!' });
        }
        const employee = await Employee.findOne({ where: { id: employeeToken.employeeId } });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found!' });
        }
        await EmployeeToken.destroy({ where: { token } });
        // Update the patient's activity status to false
        await employee.update({ active: false });

        return res.status(200).json({ message: 'Logout successful!' });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ error: 'An error occurred while logging out!' });
    }
}


async function getEmployeeByToken(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!employeeToken) {
            return res.status(404).json({ error: 'Employee token not found!' });
        }

        const employee = await Employee.findOne({ where: { id: employeeToken.employeeId } });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found!' });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee by token:', error);
        return res.status(500).json({ error: 'An error occurred while fetching the employee by token!' });
    }
}

async function getEmployeeById(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        // Check if the token is valid
        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!employeeToken) {
            return res.status(403).json({ error: 'Invalid token!' });
        }

        const { id } = req.query;
        const employee = await Employee.findOne({ where: { id } });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found!' });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        return res.status(500).json({ error: 'An error occurred while fetching the employee by ID!' });
    }
}


module.exports = {
    getAll,
    signup,
    deleteEmployee,
    updateEmployee,
    login,
    logout,
    getEmployeeById,
    getEmployeeByToken
}