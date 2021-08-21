const router = require('express').Router();
const customerController = require('./../controllers/customer.controller')
router.get('/add', (req, res) => {
    res.render('add', {
        title: "Add New Customer",
        error: "Error in this page",
    })
})
router.post('/add', (req, res) => {
    customerController.addCustomer(req.body);
    res.redirect('/show-all')

})
router.get('/', (req, res) => {
    allCustomers = customerController.showAllCutomers();
    res.render('all', {
        title: "Show all customers", 
        allCustomers,
        isEmpty: allCustomers.length ? false : true
    })
})
router.get('/show-all', (req, res) => {
    allCustomers = customerController.showAllCutomers();
    res.render('all', {
        title: "Show all customers",
        error: "Error in this page"  ? "Error in this page" : '',
        allCustomers,
        isEmpty: allCustomers.length ? false : true
    })
})
router.get('/edit/:id', (req, res) => {
    customerData = customerController.searchCustomerByData(req.params.id)
    res.render('edit', {
        title: "Edit this Customer",
        customerData
    })
})
router.post('/edit/:id', (req, res) => {
    customerController.editCustomer(req.params.id, req.body);
    res.redirect('/show-all');
})
router.get('/delete/:id', (req, res) => {
    customerController.deleteCustomer(req.params.id);
    res.redirect('/show-all')
})
router.get('/trans', (req, res) => {
    allCustomers = customerController.showAllCutomers();
   allTrue =  allCustomers.filter(c => c.status == 'true')
    res.render('trans', {
        title: "TransAction",
        allTrue
    })
})
router.get('/deposit/:id', (req, res) => {
    res.render('action', {
        title: "Action Bank"
    })
})
router.post('/deposit/:id', (req, res) => {
    customerController.depositMoney(req.params.id, req.body.value)
    res.redirect('/show-all')
})
router.get('/pull/:id' ,(req, res) => {
    res.render('action', {
        title : "Acton Bank"
    })
})
router.post('/pull/:id', (req, res) => {
    customerController.pullMoney(req.params.id, req.body.value);
    res.redirect('/show-all')
})
module.exports = router;