const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const { User, connectDB } = require('./login-database');
const Goal = require('./goal');
const Emotion = require('./emotion');
const { MongoClient } = require('mongodb');


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


// Endpoint to get all goals for the logged-in user
app.get('/api/goals', async (req, res) => {
    if (req.session.userId) {
        try {
            const goals = await Goal.find({ userId: req.session.userId });
            res.json(goals);
        } catch (error) {
            res.status(500).send("Error retrieving goals: " + error.message);
        }
    } else {
        res.status(403).send("Unauthorized");
    }
 });
 
 
 // Endpoint to add a new goal for the logged-in user
 app.post('/api/goals', async (req, res) => {
    if (req.session.userId) {
        try {
            const newGoal = new Goal({
                userId: req.session.userId,
                content: req.body.content
            });
            const savedGoal = await newGoal.save();
            res.status(201).json(savedGoal);
        } catch (error) {
            res.status(500).send("Error adding goal: " + error.message);
        }
    } else {
        res.status(403).send("Unauthorized");
    }
 });
 
 
 app.delete('/api/goals/:goalId', async (req, res) => {
    if (req.session.userId) {
        try {
            const goal = await Goal.findOneAndDelete({ _id: req.params.goalId, userId: req.session.userId });
            if (goal) {
                res.status(200).send("Goal deleted");
            } else {
                res.status(404).send("Goal not found");
            }
        } catch (error) {
            res.status(500).send("Error deleting goal: " + error.message);
        }
    } else {
        res.status(403).send("Unauthorized");
    }
 });
 

// Connection URI
const uri = 'mongodb+srv://rehonoma1:JJjj33..@blue.aw6qzs9.mongodb.net/Login+signup?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Declare collection outside the connectToMongoDB function
let collection;

// Connect to the MongoDB cluster
async function connectToMongoDB() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        // Specify the database to be used
        const database = client.db('Login+signup');
        
        // Assign the collection to the variable defined outside
        collection = database.collection('emotion');

        // Now you can perform operations on the collection
        // For example:
        // const result = await collection.insertOne({ key: 'value' });
        // console.log('Inserted document:', result.insertedId);
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

// Call the connectToMongoDB function to establish the connection
connectToMongoDB();

// Endpoint to retrieve emotions for the logged-in user
app.get('/api/emotions', async (req, res) => {
    if (req.session.userId) {
        try {
            const emotions = await Emotion.find({ userId: req.session.userId });
            res.json(emotions);
        } catch (error) {
            res.status(500).send("Error retrieving emotions: " + error.message);
        }
    } else {
        res.status(403).send("Unauthorized");
    }
});

// Endpoint to create a new emotion entry for the logged-in user
app.post('/api/emotions', async (req, res) => {
    if (req.session.userId) {
        try {
            const newEmotion = new Emotion({
                userId: req.session.userId,
                emotion: req.body.emotion,
                date: req.body.date,
                notes: req.body.notes
            });
            const savedEmotion = await newEmotion.save();
            res.status(201).json(savedEmotion);
        } catch (error) {
            res.status(500).send("Error saving emotion: " + error.message);
        }
    } else {
        res.status(403).send("Unauthorized");
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
            req.session.firstName = user.name;
            req.session.userId = user._id; // Save the user's ID in the session // Assuming 'name' is the field for the user's first name
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
