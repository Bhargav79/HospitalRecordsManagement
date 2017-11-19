
//requring library express and calling the api's
const express = require('express');
const app = express();
const port= process.env.PORT || 3000;
const appController = require('./controller/appController');
const databaseController = require('./databaseModel/databaseController');
appController(app);
databaseController(app);
app.use('/', express.static(__dirname + './view'));
app.listen(port);




