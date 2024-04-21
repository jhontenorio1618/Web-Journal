const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const { User, connectDB } = require('./login-database');

const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Setup session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true } // Set to true if using https
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../MainPages/index.html'));
});

// Serve the home.html dynamically
app.get('/home.html', (req, res) => {
    if (req.session.firstName) {
        const filePath = path.join(__dirname, '../MainPages/home.html');
        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                res.status(500).send("Error loading page");
                return;
            }
            // Replace the placeholder with the user's first name
            const personalizedHtmlData = htmlData.replace('<!--USERNAME-->', req.session.firstName);
            res.send(personalizedHtmlData);
        });
    } else {
        res.redirect('/login');
    }
});


app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../secondary-pages/log-in.html');
    console.log('Serving log-in.html at path:', filePath);
    res.sendFile(filePath);
});

// Serve the goal-setting.html dynamically
app.get('/goal-setting.html', (req, res) => {
    if (req.session.firstName) {
        const filePath = path.join(__dirname, '../secondary-pages/goal-setting.html');
        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                res.status(500).send("Error loading page");
                return;
            }
            // Replace the placeholder with the user's first name
            const personalizedHtmlData = htmlData.replace('<!--USERNAME-->', req.session.firstName);
            res.send(personalizedHtmlData);
        });
    } else {
        res.redirect('/login');
    }
});

// Serve the logger.html dynamically
app.get('/logger.html', (req, res) => {
    if (req.session.firstName) {
        const filePath = path.join(__dirname, '../secondary-pages/logger.html');
        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                res.status(500).send("Error loading page");
                return;
            }
            // Replace the placeholder with the user's first name
            const personalizedHtmlData = htmlData.replace('<!--USERNAME-->', req.session.firstName);
            res.send(personalizedHtmlData);
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/feedback-and-support.html', (req, res) => {
    if (req.session.firstName) {
        const filePath = path.join(__dirname, '../secondary-pages/feedback-and-support.html');
        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                res.status(500).send("Error loading page");
                return;
            }
            // Replace the placeholder with the user's first name
            const personalizedHtmlData = htmlData.replace('<!--USERNAME-->', req.session.firstName);
            res.send(personalizedHtmlData);
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/security-privacy.html', (req, res) => {
    if (req.session.firstName) {
        const filePath = path.join(__dirname, '../secondary-pages/security-privacy.html');
        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                res.status(500).send("Error loading page");
                return;
            }
            // Replace the placeholder with the user's first name
            const personalizedHtmlData = htmlData.replace('<!--USERNAME-->', req.session.firstName);
            res.send(personalizedHtmlData);
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/wellness-resources.html', (req, res) => {
    if (req.session.firstName) {
        const filePath = path.join(__dirname, '../secondary-pages/wellness-resources.html');
        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                res.status(500).send("Error loading page");
                return;
            }
            // Replace the placeholder with the user's first name
            const personalizedHtmlData = htmlData.replace('<!--USERNAME-->', req.session.firstName);
            res.send(personalizedHtmlData);
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/submit-login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (user) {
             // Save the user's first name in the session instead of the username
             req.session.firstName = user.name; // Assuming 'name' is the field for the user's first name
             res.redirect('/home.html');
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        res.status(500).send("Error logging in: " + error.message);
    }
});

app.post('/submit-registration', async (req, res) => {
    try {
        // Create a new user instance
        const newUser = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Save the new user to the database
        await newUser.save();
        
        // Redirect to login page or home page after successful registration
        res.redirect('/login');
    } catch (error) {
        res.status(500).send("Registration failed: " + error.message);
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));