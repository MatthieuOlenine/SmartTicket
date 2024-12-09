const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1623;
const https = require('https');
const fs = require('fs');

//A ACTIVER POUR ENVOYER EN PRODUCTION !!!!!!
/*
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/logiqservices.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/logiqservices.com/fullchain.pem')
}
*/
app.use(cors()); 
app.use(bodyParser.json()); // Pour analyser le JSON dans le corps des requêtes

const BasicManager = require('./BasicTicketing/BasicManager.js');
const DynamicManager = require('./DynamicTicketing/DynamicManager.js');
const SmartManager = require('./SmartTicketing/SmartManager.js');

function GenerateInstanceBasicManager(){
    BasicInstance = new BasicManager();
}

function GenerateInstanceDynamicManager(){
    DynamicInstance = new DynamicManager();
}

function GenerateInstanceSmartManager(){
    SmartInstance = new SmartManager();
}

// API méthodes basique

app.post('/API/BasicInstance/AddEvent', (req, res) => {
    GenerateInstanceBasicManager();
    const { _name, _max = 5 } = req.body;
    const Data = BasicInstance.AddEvent(_name, _max);
    BasicInstance = null;
    res.send(Data);
});

app.post('/API/BasicInstance/DelEvent', (req, res) => {
    GenerateInstanceBasicManager();
    const { _name } = req.body;
    const Data = BasicInstance.DelEvent(_name);
    BasicInstance = null;
    res.send(Data);
});

app.post('API/BasicInstance/GetEvent', (req, res) => {
    GenerateInstanceBasicManager();
    const {} = req.body;
    const Data = BasicInstance.GetEvent();
    BasicInstance = null;
    res.send(Data);
});

app.post('API/BasicInstance/AddRegistered', (req, res) => {
    GenerateInstanceBasicManager();
    const { _eventname, _name } = req.body;
    const Data = BasicInstance.AddRegistered(_eventname, _name);
    BasicInstance = null;
    res.send(Data);
});

app.post('API/BasicInstance/DelRegistered', (req, res) => {
    GenerateInstanceBasicManager();
    const { _eventname, _name } = req.body;
    const Data = BasicInstance.DelRegistered(_eventname, _name);
    BasicInstance = null;
    res.send(Data);
});

app.post('API/BasicInstance/LogIn', (req, res) => {
    GenerateInstanceBasicManager();
    const {_eventname, _name} = req.body;
    const Data = BasicInstance.LogIn(_eventname, _name);
    BasicInstance = null;
    res.send(Data);
});

// API méthodes dynamique

app.post('/API/DynamicInstance/AddEvent', (req, res) => {
    GenerateInstanceDynamicManager();
    const { _name, _max = 5 } = req.body;
    const Data = DynamicInstance.AddEvent(_name, _max);
    DynamicInstance = null;
    res.send(Data);
});

app.post('/API/DynamicInstance/DelEvent', (req, res) => {
    GenerateInstanceDynamicManager();
    const { _name } = req.body;
    const Data = DynamicInstance.DelEvent(_name);
    DynamicInstance = null;
    res.send(Data);
});

app.post('API/DynamicInstance/GetEvent', (req, res) => {
    GenerateInstanceDynamicManager();
    const {} = req.body;
    const Data = DynamicInstance.GetEvent();
    DynamicInstance = null;
    res.send(Data);
});

app.post('API/DynamicInstance/AddRegistered', (req, res) => {
    GenerateInstanceDynamicManager();
    const { _eventname, _name } = req.body;
    const Data = DynamicInstance.AddRegistered(_eventname, _name);
    DynamicInstance = null;
    res.send(Data);
});

app.post('API/DynamicInstance/DelRegistered', (req, res) => {
    GenerateInstanceDynamicManager();
    const { _eventname, _name } = req.body;
    const Data = DynamicInstance.DelRegistered(_eventname, _name);
    DynamicInstance = null;
    res.send(Data);
});

app.post('API/DynamicInstance/LogIn', (req, res) => {
    GenerateInstanceDynamicManager();
    const {_eventname, _name} = req.body;
    const Data = DynamicInstance.LogIn(_eventname, _name);
    DynamicInstance = null;
    res.send(Data);
});

// API méthodes intelligente

app.post('/API/SmartInstance/AddEvent', (req, res) => {
    GenerateInstanceSmartManager();
    const { _name, _max = 5 } = req.body;
    const Data = SmartInstance.AddEvent(_name, _max);
    SmartInstance = null;
    res.send(Data);
});

app.post('/API/SmartInstance/DelEvent', (req, res) => {
    GenerateInstanceSmartManager();
    const { _name } = req.body;
    const Data = SmartInstance.DelEvent(_name);
    SmartInstance = null;
    res.send(Data);
});

app.post('API/SmartInstance/GetEvent', (req, res) => {
    GenerateInstanceSmartManager();
    const {} = req.body;
    const Data = SmartInstance.GetEvent();
    SmartInstance = null;
    res.send(Data);
});

app.post('API/SmartInstance/AddRegistered', (req, res) => {
    GenerateInstanceSmartManager();
    const { _eventname, _name } = req.body;
    const Data = SmartInstance.AddRegistered(_eventname, _name);
    SmartInstance = null;
    res.send(Data);
});

app.post('API/SmartInstance/DelRegistered', (req, res) => {
    GenerateInstanceSmartManager();
    const { _eventname, _name } = req.body;
    const Data = SmartInstance.DelRegistered(_eventname, _name);
    SmartInstance = null;
    res.send(Data);
});

app.post('API/SmartInstance/LogIn', (req, res) => {
    GenerateInstanceSmartManager();
    const {_eventname, _name, _parameter} = req.body;
    const Data = SmartInstance.LogIn(_eventname, _name, _parameter);
    SmartInstance = null;
    res.send(Data);
});

//A ACTIVER EN PRODUCTION !!!!
/*
https.createServer(options, app).listen(1623, () =>{
    console.log('\n Server is running on port 1623 with https\n\nhttps://logiqservices.com:1623\n');
})
*/
// A DESACTIVER AVANT DE BUILD !!!

app.listen(port, () => {
    console.log('app.js running on port 1623\n\nhttp://localhost:1623');
});