const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const mongodbUri = 'mongodb://localhost:27017';
const localDatabaseName = 'anytimelibrary';
const usersCollection = 'users';

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

// Get users
router.get('/users', (req, res) => {
    connection((client) => {

        var db = client.db(localDatabaseName);

        db.collection(usersCollection)
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });

    });

});

// Resgitser new user
router.post('/users', (req, res) => {

    var user = req.body;
    var searchParam = { email: user.email };

    connection((client) => {

        var db = client.db(localDatabaseName);

        db.collection(usersCollection)
            .find(searchParam)
            .toArray()
            .then((users) => {

                if(users.length == 0) {

                    db.collection(usersCollection).insertOne(user, function (err, r) {
                        assert.equal(null, err);
                        assert.equal(1, r.insertedCount);
                        res.json(r.ops[0]);
                    });
                }
                else {
                    throw new Error('User already exists');
                }

            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Check if user exists with provided credentials
router.get('/users/:email/:password', (req, res) => {
    connection((client) => {

        var email = req.params.email;
        var password = req.params.password;
        var searchParam = { email: email, password: password};

        var db = client.db(localDatabaseName);

        db.collection(usersCollection)
            .find(searchParam)
            .toArray()
            .then((users) => {
                res.json(users[0]);
            })
            .catch((err) => {
                sendError(err, res);
            });

    });

});

// Find user by user id
router.get('/users/:userId', (req, res) => {
    connection((client) => {

        var userId = req.params.userId;
        var searchParam = { _id: ObjectID(userId) };

        console.log(searchParam);
        
        var db = client.db(localDatabaseName);

        db.collection(usersCollection)
            .find(searchParam)
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