const {MongoClient, ObjctId} = require('mongodb');
const myConnection = (callback) => {
    MongoClient.connect('mongodb://localhost:27017', {}, (error, client) => {
        if(error) return callback(error, false);
        const db = client.db("Tasks");
        callback(false, db);
    })
}

module.exports = myConnection;
