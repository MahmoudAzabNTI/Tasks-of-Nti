require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.DBURL, {}).then(() => {
    console.log("Database is connect")
}).catch((err) => {
    console.log(err);
})
// mongoose.connect('mongodb://localhost:27017/Test', {})
const Data = mongoose.model('posts',{
    title:{
        type: String
    },
    content: {
        type: String
    }
})
const newInsert = new Data({title: 'a', content: "b"})

app.get('', (req, res) => {
    newInsert.save().then(()=>{
    res.status(200).send(newInsert);

    }).catch((err) => {
        console.log(err);
    })  
})
app.listen(3000, () =>{
    console.log("sever play is running")
})