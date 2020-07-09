const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection URL and Database settings
const url = process.env.ATLAS_CONNECTION;
const settings = {useUnifiedTopology: true};

//Database and Collection Names
const dbName = 'shop';
const colName = 'inventory';

//READ functions
const getInventory = () => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if(err) {
                reject(err);
            }else {
                console.log("Connected to DB for READ");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs){
                    if(err) {
                        reject(err);
                    } else {
                        console.log("Found the requested inventory");
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return myPromise;
}

const getItemById = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if(err) {
                reject(err);
            }else {
                console.log("Connected to DB for READ by ID");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                try {
                    const _id = new ObjectID(id);
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
            }
        });
    });
    return myPromise;
}

//CREATE function
const addItem = (item) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if(err) {
                reject(err);
            } else {
                console.log("Connected to DB for CREATE");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(item, (err, result) => {
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

//UPDATE: Put function
const updateItem = (id, item) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if(err) {
                reject(err);
            } else {
                console.log('Connected to DB for UPDATE: PUT');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({_id: ObjectID(id)}, item,
                {upsert: true}, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve({updated_id: id});
                        client.close;
                    }
                });
            }
        });
    });
    return myPromise;
}

//UPDATE: Patch function
const updateItemValues = (id, item) => {
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
                    collection.updateOne({_id}, {$set: {...item}}, function (err, data){
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
        });
    });
    return myPromise;
}

//DELETE function
const deleteItem = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if(err) {
                reject(err);
            } else {
                console.log("Connected to DB for DELETE");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                try {
                    const _id = new ObjectID(id);
                    collection.findOneAndDelete({_id}, function (err, data) {
                        if(err) {
                            reject(err);
                        }else{
                            if(data.lastErrorObject.n > 0) {
                                console.log("Data.value",data);
                                resolve(data.value);
                            }else{
                                resolve({error: "ID doesn't exist in Database"})
                            }
                        }
                    });
                } catch(err) {
                    reject({error: "ID has to be in ObjectID format"});
                }
            }
        });
    });
    console.log("MyPromise: ", myPromise);
    return myPromise;
}

module.exports = {
    getInventory,
    getItemById,
    addItem,
    updateItem,
    updateItemValues,
    deleteItem
}