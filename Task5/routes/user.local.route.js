const router = require('express').Router();
const userController = require('./../src/controllers/user.controller');
const { showAllUsers } = require('./../src/controllers/user.controller');
router.get('/add', (req, res) => {
    if(req.query.name){
        userController.addNewUser(req.query.name, req.query.age, req.query.balance)
    }
    res.render('add')
})

router.post('/add', (req , res) => {
    console.log(req.body);
    userController.addNewUser(req.body.name, req.body.age, req.body.balance)
    res.redirect('/add')
})
router.get('/showAll', (req, res) => {
    allUsers = userController.showAllUsers();
    console.log(allUsers);
    res.render('all', {
        title: "show all users",
        allUsers,
        isEmpty: allUsers.length ? false : true
    })
})

router.get('/edit/:id', (req, res) => { 
    userData = userController.searchUser(req.params.id)
    console.log(userData);
    res.render('edit', {
        title : "edit ",
        userData
    })
})
router.post('/edit/:id', (req, res) => {
    user = req.body;
    userController.editUser(req.params.id, req.body);
    res.redirect('/showAll');
})
router.get('/delete/:id', (req, res) => {
    allUsers = userController.deleteUser(req.params.id); 
    showAllUsers();
    res.redirect('/showAll')
})
// router.delete('/delete/:id', (req, res) => {
//     userController.deleteUser(req.params.id);
//     showAllUsers();
//     res.redirect('/showAll');
// })
module.exports = router;