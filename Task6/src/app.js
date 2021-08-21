const express = require('express');
const app = express();
const userRoute = require('./../routes/user.route')
const taskRoute = require('../routes/task.route');
const User = require('../app/models/user.model');
app.use(express.json())
// app.use('/user', userRoute)
// app.use('/task', taskRoute);
x = [
    {r: '/user', d: userRoute},
    {r: '/task', d: taskRoute},
]

x.forEach(e => {app.use(e.r, e.d)})
module.exports = app;