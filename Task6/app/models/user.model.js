const mongoose = require('mongoose');
const validator = require('validator')
const User = mongoose.model('User', {
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,

    },
    userName: {
        type: String,
        required: true,
        trim: true,
        mainlength: 3,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        //match: [],
        validate(value){
            if(value.includes('abs')) throw new Error("Password Containe abs")
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid phone")
        }

    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    dof: {
        type: Date
    },
    timestamps: {
        type: Date
    },
})

module.exports = User;