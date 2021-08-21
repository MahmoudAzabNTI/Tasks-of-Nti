const fs = require('fs')
let customers = [];

readJsonFile = () => {
    try {
        customers = JSON.parse( fs.readFileSync('src/models/customer.json').toString());
        if(! Array.isArray(customers)) throw new Error()
    } catch (error) {
        customers = [];
    }

}
writeJsonFile = () => {
    fs.writeFileSync('src/models/customer.json', JSON.stringify(customers));
}
class Customer {
    checkUniqeData (data, customers){
        return customers.findIndex(c => c.name == data.name.toLowerCase() || c.accNum == data.accNum) != -1
    }
    addCustomer(data) {
        readJsonFile();
        if(this.checkUniqeData(data, customers)) return console.log("invalid data");
        let customer = {
            id: new Date().getTime(),
            name: data.name.toLowerCase(),
            accNum: data.accNum,
            balance: data.balance,
            status: false,
        }
        readJsonFile()

        customers.push(customer);
        writeJsonFile();
    }

    showAllCutomers(){
        readJsonFile();
        return customers;
    }
    searchCustomerById(id){
        readJsonFile();
        let index = customers.findIndex(cust => cust.id == id);
        if(index == -1) return console.log("Customer not found");
        return index; 
    }
    searchCustomerByData(id){
        readJsonFile();
        let index = customers.find(cust => cust.id == id);
        if(index == -1) return console.log("Customer not found");
        return index; 
    }
    editCustomer(id, newData) {
        //|| isFoundAccNum != -1 && isFoundAccNum != index
        readJsonFile();
        let index = this.searchCustomerById(id);
        if(index == -1) return console.log("Customer not found");
        let isFoundName = customers.findIndex(cust => cust.name == newData.name)
        let isFoundAccNum = customers.findIndex(cust => cust.accNum == newData.accNum)
        if(isFoundName != -1 && isFoundName != index ) return console.log("Nmae is already found");
        if(isFoundAccNum != -1 && isFoundAccNum != index ) return console.log("AccNum is already found");
        newData.id = customers[index].id
        customers[index] = newData

        // customers[index].id = newData.id || customers[index].id
        // customers[index].name = newData.name || customers[index].name
        // customers[index].accNum = newData.accNum || customers[index].accNum
        // customers[index].balance = newData.balance || customers[index].balance
        // customers[index].status = newData.status || customers[index].status
        writeJsonFile();

    }
    deleteCustomer(id){
        readJsonFile();
        let index = this.searchCustomerById(id);
        if(index == -1 ) return console.log("Customer not found");
        customers.splice(index, 1);
        writeJsonFile();
    }
    depositMoney(id, value){
        readJsonFile();
        let index = this.searchCustomerById(id);
        if(index == -1) return console.log("Customer not found");
        if(!customers[index].status) return console.log("this customer is no activated");
        if(value > 10000) return console.log("it more than 10k");
        customers[index].balance = Number.parseInt(customers[index].balance) + Number.parseInt(value)
        writeJsonFile();
    }
    pullMoney(id, value) {
        let index = this.searchCustomerById(id);
        if(index == -1) return console.log("Customer not found");
        if(!customers[index].status) return console.log("this customer is no activated");
        if(value > 5000) return console.log("it more than 5k");
        if(customers[index].balance < value) return console.log("your balance is not enough");
        customers[index].balance = Number.parseInt(customers[index].balance) - Number.parseInt(value)
        writeJsonFile();
    }
}


let customer = new Customer();
module.exports  = customer;