const router = require('express').Router();
const taskController = require('../app/controllers/task.cotroller')
router.post('/add', taskController.addTask)
router.get('/all', taskController.showAllTasks)
router.get('/:id', taskController.showSingleTask)
router.put('/:id', taskController.editTask);
router.delete('/:id', taskController.deleteTask);
module.exports = router;