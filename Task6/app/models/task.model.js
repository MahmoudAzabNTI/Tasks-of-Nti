const mongoose = require('mongoose')
const Task = mongoose.model('Task', {
    title: {
        type: String,
    },
    content: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true,
        validate(value){
            if(value < new Date()) throw new Error ("error date")
        }
    }
})
module.exports = Task;