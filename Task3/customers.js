const fs = require('fs');

class Customer {
    myData = null;
    readData(){
        try {
            this.myData = JSON.parse( fs.readFileSync('data.json').toString())
            if(!Array.isArray(this.myData)) throw new Error('');
            return this.myData;
        } catch (error) {
            this.myData = [];
        }
    }
    writeData() {
        try {
            fs.writeFileSync('data.json', JSON.stringify(this.myData))
        } catch (error) {
            console.log(error);
        }
    }
    searchCustomer(id){
        this.Data = this.readData();
        let index = this.myData.findIndex(cust => cust.id == id)
        return index;
        
    }
    addCustomer (data) {
        let cust = {
            id: new Date().getTime(),
            name: data.name,
            balance: data.balance,
            accNum: data.accNum,
            status: false,
        }
        //let existName = this.showCustomer({name: data.name}).length
        //try {
            //if(existName > 0) throw new Error('name is already found')
            //else
            this.readData();
            this.myData.push(cust);
            this.writeData();
        //} catch (error) {
          //  console.log("this name is used befor");
        //}
    }
    showCustomers(){
        this.readData();
        this.myData.forEach(cust => {
            console.log(`${cust.id} -- ${cust.name} -- ${cust.balance} -- ${cust.accNum} -- ${cust.status}`);
        })
    }
    showCustomer(argv){
        let searchKey = null;
        for(let x in argv) if(x != "_" && x != "$0") searchKey = x;
        console.log(searchKey);
        this.readData();
        let result = this.readData().filter(cust => cust[searchKey] == argv[searchKey]);
        console.log(result);
        return result;
    }
    deleteCustomer(argv){
        this.readData();
        let i = this.myData.findIndex(cust => cust.id == argv.id);
        if(i == -1) return console.log("no found");
        this.myData.splice(i, 1);
        this.writeData();
        console.log("this customer is deleted successfully");
    }
    editCustomer(argv){
        this.readData();
        let i = this.myData.findIndex(cust => cust.id == argv.id);
        if(i == -1) return console.log("this is not found");
        let isFound = this.myData.findIndex(cust => cust.title == argv.newName)
        console.log(isFound);
        if(isFound != -1 && isFound != i) return console.log('title is already found')
        this.myData[i].name = argv.newName  || this.myData[i].name
        this.myData[i].balance = argv.newBalane || this.myData[i].balance
        this.myData[i].accNum = argv.newNum || this.myData[i].accNum
        this.writeData();
    }
    transBalance(argv){
        let i = this.searchCustomer(argv.id);
        if(i == -1) return console.log("this customer not found");
        if(!this.myData[i].status) return console.log("this customer is no activate");
        if(argv.type == 1){
            if(argv.value > 10000) return console.log("cann't be depost balance it more 10K");
            this.myData[i].balance += argv.value;
        }
        else if (argv.type == 2) {
            if(argv.value > 5000) return console.log("cann't be pull balance it more 10K");
            if(this.myData[i].balance < argv.value) return console.log("your balance is not enough");
            this.myData[i].balance -= argv.value;
        }
        
        this.writeData();
        console.log("your balance it is " + this.myData[i].balance);
    }
    
}

let myCust = new Customer();
// console.log (myCust.readData());
// myCust.searchCustomer(1628665268794)
// myCust.transBalance(1628665268794, 5000, 2)
module.exports = myCust;