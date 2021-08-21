const fs = require("fs")
let data = [];
readJSONFile = () => {
    try{
        data = JSON.parse( fs.readFileSync('src/models/data.json').toString());
        if(!Array.isArray(data)) throw new Error()
        return data;
    }catch(e){
        data = [];
    }
}
writeJSONFile = () => {
    fs.writeFileSync('src/models/data.json',JSON.stringify(data))
}
class User {
    addNewUser(name, age, balance){
        let newUser = {
            id: new Date().getTime(),
            name, age ,balance
        }
        data.push(newUser);
        writeJSONFile();
    }
    editUser(userId, newData) {
        readJSONFile();
        let index = data.findIndex(user => user.id == userId);
        newData.id = data[index].id  
        data[index] = newData;
        writeJSONFile();
    }
    deleteUser(userId){
        readJSONFile()
        let index = data.findIndex(user=> user._id === userId)
        data.splice(index, 1)
        writeJSONFile()
    }
    showAllUsers(){
        readJSONFile();
        return data;
    }
    showSingelUser(){

    }
    searchUser(userId){
        readJSONFile()
        console.log(data);
        let index = data.findIndex(user=> user.id == userId)
        return data[index]
    }
}
let newUser = new User();
module.exports = newUser;