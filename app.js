const express = require('express');
const postRoutes = require('./routes/post');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//invokes dotenv file
dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(()=> console.log('db connected'))

mongoose.connection.on('error', err => {
    console.log(`db connection error ${err}`)
})

const myMiddleware = (req, res, next) => {
    console.log("middleware applied");
    next();
}

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(myMiddleware);

//now this postRoutes acts as a middleware so app.use()
app.use('/', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`A Node js API is listening on port: ${port}`);});