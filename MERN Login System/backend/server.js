// Express imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

// Flask imports
const child = require('child_process').execFile;
const urlExist = require("url-exist"); 
const { exec } = require('child_process');

// Create a child process to run the flask server
child('flask_server.exe', (err, data) => { 
    if (err) { 
        console.error(err); 
        return; 
    } 
    console.log(data.toString()); 
}); 

// Wait for flask server response
let exists = false;
// while (!exists) {
    (async () => {
        exists = await urlExist("http://127.0.0.1:2080/"); 
        // Handle result 
        console.log(`Flask server responsive: ${exists}`);
    })(); 
// }

require('dotenv').config();

const app = express();
const usersRouter = require('./routes/api/users');
const imgRouter = require('./routes/api/dashboard');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json());

// MongoDB Configuration
const db_keys = require('./config/keys').mongo_uri;

mongoose
    .connect(
        db_keys, 
        {useNewUrlParser: true,
        useUnifiedTopology: true}
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/dashboard', imgRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// On close of express server event
process.on('SIGINT', () => {
    console.log('shutting down');
    // Kill process of the flask server
    exec('taskkill /f /t /im flask_server.exe', (err, stdout, stderr) => { 
        if (err) { 
          console.log(err) 
          return;
        } 
        // the *entire* stdout and stderr (buffered) 
        console.log(`stdout: ${stdout}`); 
        console.log(`stderr: ${stderr}`); 
    }); 
    console.log('Flask server terminated')
    // Close express server
    server.close();
  });

//    
  