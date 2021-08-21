require('dotenv').config();
const port = process.env.PORT || 3004;
const app = require("./src/app");
// require('./src/api')
app.listen(port, () => {
    console.log("Server Up");
})