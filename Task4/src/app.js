const express = require('express');
const hbs = require('hbs');
const path = require('path')
const app = express();

const customerRoute = require('./routes/customer.route')
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './../design/views'))
app.use(express.static(path.join(__dirname, './../public')))
hbs.registerPartials(path.join(__dirname, './../design/layouts'))

app.use(express.urlencoded())
app.use(express.json())
app.use(customerRoute)
module.exports = app;