const router = require('express').Router();
const dbConnection = require('./../src/controllers/db.connection')
const {ObjectId}  = require("mongodb")
router.get('/add', (req, res) => {
    res.render('add', {
        title: "add new User"
    })
})

router.post('/add', (req , res) => {
    data = req.body
    dbConnection((error, db) => {
        if(error) res.send('database is error')
        db.collection("users").insertOne(data, (err, d) => {
            if(err) res.send(err);
            res.redirect('/showAll')
        })
    })
})
router.get('/showAll', (req, res) => {
    dbConnection((error, db) => {
        if(error) res.send("database error")
        db.collection('users').find().toArray((e, d) => {
            if(e) res.send(e)
            res.render('all', {
                title: "show all users",
                allUsers : d,
                isEmpty: d.length ? false : true
            })
        })
    })
   
})
router.get('/single/:id', (req, res) => {
    id = req.params.id;
    dbConnection((error, db) => {
        if(error) res.send('database error')
        db.collection('users').findOne({_id: new ObjectId(id)}, (err, d) => {
            if(err) res.send(err)
            res.render('single', {
                title: "show single data",
                user: d
            })
        })
    })
})

router.get('/edit/:id', (req, res) => { 
    userData 
    console.log(userData);
    res.render('edit', {
        title : "edit ",
        userData
    })
})
router.post('/edit/:id', (req, res) => {
    user = req.body;
    res.redirect('/showAll');
})
router.get('/delete/:id', (req, res) => {
    allUsers; 
    showAllUsers();
    res.redirect('/showAll')
})
// router.delete('/delete/:id', (req, res) => {
//     userController.deleteUser(req.params.id);
//     showAllUsers();
//     res.redirect('/showAll');
// })
module.exports = router;