const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoURL } = require("./config");
require("dotenv").config();

const app = express();

// setup mongoDB connection....
mongoose.connect(mongoURL, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( () => {
        console.log('Connected to MongoDB server...');
    })
    .catch( err => {
        console.log('No connection...', err);
    });


//==================middleware=============================
app.use(cors({
    methods: ['GET', 'POST'],
    origin: ['*', 'https://frontend-server-example.com']
}));
app.use(morgan('dev'));

app.use(express.json({ limit: '5mb'}));
app.use(express.urlencoded({ limit: '5mb', extended: true}));



//==================routes=================================

app.get('/', (req, res) => {
    res.send(`Welcome to DCC NITA....`);
});


app.use('/api/notifications', require("./routes/notification_route"));


//====================server=================================

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`DCC NITA Web Server is running at port ${PORT}`);
});
