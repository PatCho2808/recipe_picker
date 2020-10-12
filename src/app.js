const express = require('express');

const app = express();

const routes = require('./routes/routes'); 

app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use('/js', express.static('./node_modules/jquery/dist'));
app.use(express.static('./public/'));
app.use(routes); 

app.set('view engine', 'ejs');

module.exports = app; 