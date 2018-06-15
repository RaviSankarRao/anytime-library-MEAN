const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const router = express.Router();
const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// Parsers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(allowCrossDomain);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', require('./server/routes/usersApi'));
app.use('/api', require('./server/routes/booksApi'));
app.use('/api', require('./server/routes/loginApi'));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/anytime-library/index.html'));
});

// Set port
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost: ${port}`));