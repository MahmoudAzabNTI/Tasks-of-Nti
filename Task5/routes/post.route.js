const router = require('express').Router();


let getData = async (cb) => {
    try {
        const fetch = require('node-fetch');
    res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
    data = await res.json();
    console.log(res);
    cb(data)
    } catch (error) {
        cb(false)
    }
    
}
router.get('/posts', (req, res) => {
    getData(result => {
        if(!result) res.send('error');
        res.render('posts', {
            result
        })
    }) 
})
module.exports = router;