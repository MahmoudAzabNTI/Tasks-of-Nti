const mongoose = require("mongoose")
mongoose.connect(process.env.DBURL, {
    useCreateIndex: true, 
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("Database is connected");
}).catch(() => {
    console.log("Databsse is faild");
})
module.exports = mongoose;