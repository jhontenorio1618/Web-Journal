const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { User, connectDB } = require('./login-database'); // Import both User and connectDB

const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../MainPages/index.html'));
});

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../MainPages/home.html'));
});

app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../secondary-pages/log-in.html');
    console.log('Serving log-in.html at path:', filePath);
    res.sendFile(filePath);
});

app.post('/submit-registration', async (req, res) => {
    const { username, email } = req.body;
    try {
        // Check if a user with the same username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (existingUser) {
            // User found with the same username or email
            return res.status(400).send('<script>alert("Username or email already exists."); window.location.href = "/login";</script>');
        }

        // No existing user found, create a new user
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/login?success=true');
    } catch (error) {
        res.status(500).send("Error registering user: " + error.message);
    }
});


app.post('/submit-login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (user) {
            res.redirect('/home.html'); // Assuming this is your dashboard page
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        res.status(500).send("Error logging in: " + error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
