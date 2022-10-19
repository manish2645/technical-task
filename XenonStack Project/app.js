const express = require('express');
const morgan = require('morgan');   
const createError = require('http-errors')
require('./Helpers/init_mongodb')
const AuthRoute = require('./Routes/auth.route');
const { verifyAccessToken } = require('./Helpers/jwt_helper');

const app = express();

app.use(morgan('dev'));
app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get('/', verifyAccessToken, async(req, res, next) => {   
    res.send("Hello from express");
})


app.use('/auth', AuthRoute);

app.use(async(req, res, next) => {
    // const error = Error("NOT FOUND")
    // error.status = 404
    // next(error)
    next(createError.NotFound());
})

app.use(async(err,req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error:{
             status : err.status || 500,
             message: err.message,
        },
    })
})

PORT_NUMBER = 3000;

app.listen(PORT_NUMBER, (err)=>{
    if(err) console.log("Cannot run server due to error Error",+err);
    else console.log("Server running on port ",+PORT_NUMBER);
})