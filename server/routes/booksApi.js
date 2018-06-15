const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const mongodbUri = 'mongodb://localhost:27017';
const localDatabaseName = 'anytimelibrary';
const booksCollection = 'books';

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

router.get('/books', (req, res) => {
    connection((client) => {

        var db = client.db(localDatabaseName);

        db.collection(booksCollection)
            .find()
            .toArray()
            .then((books) => {
                res.json(books);
            })
            .catch((err) => {
                sendError(err, res);
            });

    });

});

router.post('/books',(req, res) => {

    var book = req.body;

    connection((client) => {

        var db = client.db(localDatabaseName);

        db.collection(booksCollection).insertOne(book, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            res.json(r.ops[0]);
        });
    });
});

module.exports = router;