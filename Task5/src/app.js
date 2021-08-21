require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path')
const app = express();

const userRoutes = require('./../routes/user.route');
const postRoutes = require('./../routes/post.route');
const taskRoutes = require('./../routes/task.route');
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './../design/views'))
app.use(express.static(path.join(__dirname, './../public')));
hbs.registerPartials(path.join(__dirname, './../design/layouts'))

app.use(express.urlencoded());
app.use(express.json());
app.use(userRoutes);
app.use('/tasks', taskRoutes);
module.exports = app;