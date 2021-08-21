
const yargs = require('yargs');
const customer = require('./customers');
yargs.command({
    command: "addCustomer",
    descibe: "add new customer",
    builder: {
        name: {
            demandOption: true,
            type: 'string',
        },
        balance: {
            demandOption: true,
            type: 'number'
        },
        accNum: {
            demandOption: true,
            type: 'number'
        },
    },
    handler: function(argv){
        //console.log(argv);
        //console.log(`${argv.title} -- ${argv.content}`);
        customer.addCustomer(argv)
    }
})
yargs.command({
    command: "showCustomers",
    descibe: "show all customers",
    builder: {
    },
    handler: function(argv){
        //console.log(argv);
        //console.log(`${argv.title} -- ${argv.content}`);
        customer.showCustomers()
    }
})
yargs.command({
    command: "showCustomer",
    descibe: "search of customer",
    builder: {
        id: {type: "number"},
        name: {type: "string"},
        balance: {type: "number"},
        accNum: {type: "number"}
    },
    handler: function(argv){
        //console.log(argv);
        //console.log(`${argv.title} -- ${argv.content}`);
        customer.showCustomer(argv)
    }
})
yargs.command({
    command: "deleteCustomer",
    descibe: "delete of customer",
    builder: {
        id: {type: "number"},
    },
    handler: function(argv){
        //console.log(argv);
        //console.log(`${argv.title} -- ${argv.content}`);
        customer.deleteCustomer(argv)
    }
})
yargs.command({
    command: "editCustomer",
    descibe: "edit of customer",
    builder: {
        id: {type: "number"},
        newName: {
            demandOption: false,
            type: 'string',
        },
        newBalance: {
            demandOption: false,
            type: 'string'
        },
        accNum: {
            demandOption: false,
            type: 'number'
        },
    },
    handler: function(argv){
        //console.log(argv);
        //console.log(`${argv.title} -- ${argv.content}`);
        customer.editCustomer(argv)
    }
})
yargs.command({
    command: "transBalance",
    descibe: "deposit or pull Balance",
    builder: {
        id: {type: "number"},
        value: {type: 'number'},
        type: {type: 'number'},
        accNum: {
            demandOption: false,
            type: 'number'
        },
    },
    handler: function(argv){
        //console.log(argv);
        //console.log(`${argv.title} -- ${argv.content}`);
        customer.transBalance(argv)
    }
})
yargs.argv;