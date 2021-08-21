const express = require('express');
const router = express.Router();
const dbConnection = require('./../src/controllers/db.connection')
const {ObjectId} = require('mongodb')

router.get('/add', (req, res) => {
    res.render('tasks/add', {
        title: "Add New Task"
    })
})
router.post('/add', (req, res) => {
    user = req.body
    dbConnection((error, db) => {
        if(error) res.send('dtabase error')
        db.collection('tasks').insertOne(user, (err, data) => {
            if(err) res.send(err)
            res.redirect('/tasks/all')
        })
    })
})
router.get('/all', (req, res) => {
    dbConnection((error, db) => {
        if(error) res.send("database error")
        db.collection('tasks').find().toArray((err, data) => {
            if(err) res.send(err)

            res.render('tasks/all', {
                title: "show all tasks",
                allTasks: data,
                isEmpry: data.length ? false:true
            })
        });
        
    })
})
router.get('/edit/:id', (req, res) => {
    id = req.params.id
    dbConnection((error, db) => {
        if(error) res.send("Database error")
        db.collection('tasks').findOne({_id: ObjectId(id)}, (err, data) => {
            if(err) res.send(err)
            res.render('tasks/edit', {
                title: "Edit Data",
                task: data
            })
        })

    })
})

router.post('/edit/:id', (req, res) => {
    id = req.params.id;
    newData = req.body
    dbConnection((error, db) => {
        if(error) res.send("database error")
        db.collection('tasks').updateOne({_id: new ObjectId(id)}, {$set: newData}) ///...req.body
        .then(() => res.redirect('/tasks/all'))
        .catch(() => res.send('cannot edit'))
    })
    res.redirect('/tasks/all')
})
router.get('/delete/:id', (req, res) => {
    
    id = req.params.id;
    console.log(id);
    newData = req.body
    dbConnection((error, db) => {
        if(error) res.send("database error")
        db.collection('tasks').deleteOne({_id: new ObjectId(id)}) ///...req.body
        .then(() => res.redirect('/tasks/all'))
        .catch(() => res.send('cannot edit'))
    })
})
router.get('/single/:id', (req,res)=>{
    id = req.params.id
    dbConnection((error, db)=>{
        if(error) res.send('database error')
        db.collection('tasks').findOne({_id: new ObjectId(id)}, ((e,  data)=>{
            if(e) res.send(e)
            res.render('tasks/single', {
                title:"single Data",
                task: data
             })
            }))
        })        
    
})
module.exports = router;