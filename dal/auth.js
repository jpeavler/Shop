const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection URL and Database settings
const url = process.env.ATLAS_CONNECTION;
const settings = {useUnifiedTopology: true};

//Database and Collection Names
const dbName = 'shop';
const colName = 'users';

//Read fuction
const getUserByValue = (key, value) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if(err) {
                reject(err);
            } else {
                console.log('Conected to DB for READ');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                if(key == "_id") {
                    try {
                        const _id = new ObjectID(value);
                        const result = await collection.findOne({_id});
                        if(result) {
                            resolve(result);
                        }else {
                            reject({error: "ID not found in database"});
                        }
                        client.close();
                    } catch(err) {
                        reject({error: "ID must be in ObjectID format"});
                    }
                } else {
                    collection.find({ [key] : value}).toArray(function (err, docs) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(docs);
                            client.close();
                        }
                    });
                } 
            }
        })
    });
    return myPromise;
}

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
//Update Function (Patch)
const updateUserValues = (id, user) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if(err) {
                reject(err);
            } else {
                console.log('Connected to DB for UPDATE: PATCH');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                try {
                    const _id = new ObjectID(id);
                    collection.updateOne({_id}, {$set: {...user}}, function (err, data){
                            if(err) {
                                reject(err);
                            }else{
                                if(data.result.n > 0) {
                                    collection.find({_id}).toArray(function(err, docs){
                                            if(err) {
                                                reject(err);
                                            }else{
                                                resolve(docs[0]);
                                            }
                                        });
                                }else{
                                    resolve({error: "Nothing happened"});
                                }
                            }
                        });
            } catch(err) {
                reject({error: "ID has to be in ObjectID format"});
            }
        }
            
        })
    })
    return myPromise;
}

module.exports = {
    registerUser,
    getUserByValue,
    updateUserValues
}