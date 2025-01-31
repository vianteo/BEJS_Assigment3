const express = require('express');
const app = express();

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fungsi untuk validasi format email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Rute untuk registrasi customer
app.post('/customer/register', (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email) {
        return res.status(400).json({ error: 'Email field is required' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Password cannot be null' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Proses registrasi jika semua validasi berhasil
    res.status(201).json({ message: 'Customer registered successfully' });
});

// Rute untuk login customer
app.post('/customer/login', (req, res) => {
    const { email, password } = req.body;

    // Validasi email
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Cek email dan password yang benar (misalnya dari database atau data yang sudah ada)
    const user = { email: 'test@example.com', password: 'password123' };

    if (email !== user.email || password !== user.password) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Customer logged in successfully' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;  // Ekspor app untuk pengujian
