const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const mongodbUri = 'mongodb://localhost:27017';
const localDatabaseName = 'anytimelibrary';
const loginCollection = 'login';

// Connect to mongodb
const connection = (closure) => {
    return MongoClient.connect(mongodbUri, (err, client) => {
        if(err){
            return console.log(err);
        }

        closure(client);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// On Login - add auth token to db
router.post('/login',(req, res) => {

    var userLogin = req.body;

    connection((client) => {

        var db = client.db(localDatabaseName);

        db.collection(loginCollection).insertOne(userLogin, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            res.json(r.ops[0]);
        });
    });
});


// Check if user was already logged in
router.get('/login/:authtoken', (req, res) => {
    connection((client) => {

        var authtoken = req.params.authtoken;
        var userLogin = { authtoken: authtoken };

        var db = client.db(localDatabaseName);

        db.collection(loginCollection)
            .find(userLogin)
            .toArray()
            .then((users) => {
                res.json(users[0]);
            })
            .catch((err) => {
                sendError(err, res);
            });

    });

});



module.exports = router;