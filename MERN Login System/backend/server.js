const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const app = express();
const usersRouter = require('./routes/api/users');
const imgRouter = require('./routes/api/dashboard');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// });
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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});