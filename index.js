let express = require('express');

const app = express();
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const posts = require('./routes/post');

//dotenv configuration
dotenv.config();

//Import Routes
const authRoutes = require('./routes/auth');

//Routes Middlewares
app.use(bodyParser.json());
app.use('/api/user',authRoutes);
app.use('/api/posts', posts);

//connect to MongoDb
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, (req, res) => {
    console.log("Mongo Database Connection Succesfull!");
})

app.listen(3000, (req, res) => {
    console.log("Server started at 3000");
});