const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection URL and Database settings
const url = process.env.ATLAS_CONNECTION;
const settings = {useUnifiedTopology: true};

//Database and Collection Names
const dbName = 'shop';
const colName = 'users';

//CREATE function
const registerUser = (user) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if(err) {
                reject(err);
            } else {
                console.log("Connected to DB for CREATE");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(user, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    }
                });
            }
        });
    });
    return myPromise;
}

module.exports = {
    registerUser
}