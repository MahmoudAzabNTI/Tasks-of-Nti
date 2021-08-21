const { userInfo } = require('os');
const Task = require('../models/task.model')
module.exports = {
    async addTask(req, res){
        try{
            let task = new Task(req.body);
            await task.save();
            res.status(200).send(generateStatus(true, task, "Added Success"))
        }catch(error){
            res.status(500).send(generateStatus(false, error.message, "task inserting problem"))
        }
        
    },
    async showAllTasks(req, res){
        try {
            const tasks = await Task.find();
            res.status(200).send(generateStatus(true, tasks, "Tasks Fetch Success"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "error loading tasks"))
        }
        
    },
    async showSingleTask(req, res) {
        try {
            const task = await Task.findOne({_id: req.params.id})
            if(!task) return res.status(404).send(generateStatus(false, null, "task not foound"))
            res.status(200).send(generateStatus(true, task, "Task Fetch Success"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "error loading task"))
        }

    },
    async editTask(req, res){
        try {
            const allowed = ['dueDate']
            const requested = Object.keys(req.body);
            const isValidUpdated = requested.every(r => allowed.includes(r));
            if(!isValidUpdated) return res.status(404).send(generateStatus(false, null, "invalid requested"))
            const newTask = req.body
            const task = await Task.findOneAndUpdate({_id: req.params.id}, {$set: {
                newTask
            }}, {new: false, runValidators: true })
            if(!task) return res.status(404).send(generateStatus(false, null, "task not found"))
            res.status(200).send(generateStatus(true, task, "Updated"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "error in Update"))
        }
    },
    async deleteTask(req, res){
        try {
            const task = await Task.findOneAndDelete({_id: req.params.id})
            if(!task) return res.status(404).send(generateStatus(false, null, "task not found"))
            res.status(200).send(generateStatus(true, task, "Deleted"))
        } catch (error) {
            res.status(500).send(generateStatus(false, error.message, "error in delete"))
        }

    }
}
const generateStatus = (apiStatus, data, message) => {
    return [
        apiStatus,
        data,
        message
    ]
}