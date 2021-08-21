require('dotenv').config();
const app = require('./src/app');
const db = require('./db/connection')
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("server is running");
})
    