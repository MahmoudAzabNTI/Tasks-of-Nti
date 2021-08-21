const router = require('express').Router();
const userController = require('../app/controllers/user.controller')
router.post('/add', userController.addUser)
router.get('/all', userController.showAllUsers)
router.get('/:id', userController.showSingleUser)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

module.exports = router;
