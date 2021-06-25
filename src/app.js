const express = require('express');
const path= require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app= express();

//connecting db

mongoose.connect('mongodb://localhost/crud-mongo')
.then(db => console.log('Data Base Connected'))
.catch(err => console.log(err));

//importation of routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/', indexRoutes);

//starting the serve
app.listen(app.get('port'), ()=>{
    console.log(`Server on port: ${app.get('port')}`);
});

module.exports = app;