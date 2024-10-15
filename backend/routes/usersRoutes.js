const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare password with hashed password stored in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Exclude the password field from the response
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        // Respond with user data including role
        res.status(200).json({
            username: userWithoutPassword.username,
            email: userWithoutPassword.email,
            role: userWithoutPassword.role // Include role in the response
        });
        console.log(res);
        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Something went wrong', error });
    }
});

// Register route
router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email
        });

        await newUser.save();
        res.send('User registered successfully');
    } catch (error) {
        return res.status(500).json({ message: 'Registration failed', error });
    }
});


module.exports = router;
