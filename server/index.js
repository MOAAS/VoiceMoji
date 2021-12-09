const express = require("express");
const app = express();

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set Access-Control headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

// Enable logger
const logger = require('morgan');
app.use(logger('dev'));

// API routes
// const errorCatcher = (routeFunction) => {
//     return (req, res, next) => routeFunction(req, res).catch(next);
// }

app.get('/hello', (req, res) => {
    return res.status(200).send("Hello");

})



// Error handler
app.use(function (err, req, res, next) {
    console.log(err)
    if (res.headersSent)
        return next(err)
    res.status(err.statusCode || 500).json(err);
})

// Serve public folder
app.use('/public', express.static("public"));

// Run the app
const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})