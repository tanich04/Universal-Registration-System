const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = []; // Array to hold registered users temporarily (simulate DB)

// Simulated company database function
const sendToCompanyDatabase = (userData) => {
    // Here you would send the user data to the actual company database.
    console.log("Sending user data to company database:", userData);
};

app.post('/register', async (req, res) => {
    const { name, email, password, address, city, state, zip, phone } = req.body;

    // Check if the user already exists by email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already registered with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data (excluding the password)
    const userData = { 
        name, 
        email, 
        address: address || '', // Optional
        city: city || '',       // Optional
        state: state || '',     // Optional
        zip: zip || '',         // Optional
        phone: phone || ''      // Optional
    };

    // Register new user
    users.push({ ...userData, password: hashedPassword }); // Store hashed password
    sendToCompanyDatabase(userData); // Send user data (excluding password)

    return res.status(201).json({ message: 'User registered successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
