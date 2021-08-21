const User = require('../models/user.model')
module.exports = {

    async addUser(req, res){
        try {
            const user = new User(req.body);
            await user.save();
            res.status(200).send(generateStatus(true, user, "User register Success"))
        } catch (error) {
            // res.status(500).send(false, error.message, "error occured")
            res.status(500).send(generateStatus(false, error.message, "error occured"))
        }    
    },
    async showAllUsers(req, res){
        try {
            const users = await User.find();
            if(!user) res.status(404).send(generateStatus(false, null, "not found"))
            else
            res.status(200).send(generateStatus(true, users, "get all users success"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "errorr occurred"))
        }
    },
    async showSingleUser(req, res){
        try {
            const user = await User.find({_id: req.params.id});
            if(!user) res.status(404).send(generateStatus(false, null, "not found"))
            else
            res.status(200).send(generateStatus(true, user, "get one user success"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "errorr occurred"))
        }
    },
    async editUser(req, res){
        try {
            const allowed  = ['name', 'email', 'password'];
            //let vales = Object.vales(req.body);
            let requested = Object.keys(req.body);
            console.log(requested);
            const isValidUpdates = requested.every(r => allowed.includes(r))
            if(!isValidUpdates) return res.status(400).send(generateStatus(false, null, "not allowed all this "))
            const newUser = req.body
            const user = await User.findOneAndUpdate({_id: req.params.id}, {$set: newUser}, {new: false, runValidators: true});
            if(!user) return res.status(404).send(generateStatus(false, null, "not found"))
            res.status(200).send(generateStatus(true, newUser, "User updated Successfully"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "error occurred"))
        }
    },
    async deleteUser(req, res){
        try {
            let user = await User.findOneAndDelete({_id: req.params.id})
            if(!user) res.status(404).send(generateStatus(false, null, "not found"))
            else
            res.status(200).send(generateStatus(true, user, "User Deleted succssfuly"))
            
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, 'error occured'))
        }
        
    }
}
const generateStatus = (apiStatus, data, message) => {
    return{
        apiStatus,
        data,
        message
    }
}