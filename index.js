const express = require('express')
var homeRouter = require('express').Router();
const appHome = require('path').dirname(require.main.filename);
var http = require('http');
let startApp = () => {
    var app = express();
    app.set('x-powered-by', false);
    app.use('/', homeRouter);
    app.use('/static', express.static('static'));

    let port = process.env.PORT || 3000
    http.createServer(app).listen(port, () => console.log(`IAM started on http port ${port}`));
    process.on('unhandledRejection', function (reason, p) {
        console.log('Unhandled Reject' + reason + p)
    });
    process.on('uncaughtException', function (error, req, res, next) {
        console.log('UnhandledException')
        console.log(error, req, res, next)
        // process.exit(1)
    });

};

homeRouter.get('/', (req, res) => {
    res.sendFile(appHome + '/index.html');
});

startApp();