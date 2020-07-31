const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

let db = null;

mongoClient.connect((err, client) => {
    if (err) { console.error(err) };
    db = client.db("database");
    console.log('Successfully connected to database');
})

async function getUser(username = null, email = null) {
    return new Promise((resolve, reject) => {
        try {
            db.collection("users").findOne({
                "$or": [{
                    username: username
                }, {
                    email: email
                }]
            }, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function addUser(username, email, password) {
    return new Promise((resolve, reject) => {
        const data = {
            username: username,
            email: email,
            password: password
        }
        try {
            db.collection("users").insertOne(data, function (err, res) {
                if (err) throw err;
                resolve('success');
            });
        } catch (err) {
            reject(err);
        }
    });
}

exports.getUser = getUser;
exports.addUser = addUser;