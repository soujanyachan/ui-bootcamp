'use strict';
const _ = require('lodash');
const express = require('express');
var cors = require('cors');
const db = require('./db');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors())

const applyHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return res;
}

app.use('/health-check', (req, res) => {
    res.send('UP');
});

app.post('/todos', async (req, res) => {
    console.log(req.body);
    const resp = await db.createTodo(req.body);
    res = applyHeaders(res);
    res.status(200).send(resp);
})

app.put('/todos/:id', async (req, res) => {
    console.log(req.body);
    const resp = await db.updateTodo(req.body);
    res = applyHeaders(res);
    res.status(200).send(resp);
})

app.delete('/todos/:id', async (req, res) => {
    console.log(req.body, req.params, "delete");
    const resp = await db.deleteTodo({_id: req.params.id});
    res = applyHeaders(res);
    res.status(200).send(resp);
})

app.delete('/todos', async (req, res) => {
    const resp = await db.deleteAllCompletedTodos();
    res = applyHeaders(res);
    res.status(200).send(resp);
})

app.get('/todos', async (req, res) => {
    console.log(req.query.query, "query in get all")
    let query = {};
    try {
        query = JSON.parse(atob(req.query.query));
    } catch (e) {}
    console.log(query, "query in get all")
    const resp = await db.getAllTodos(query);
    res = applyHeaders(res);
    res.status(200).send(resp);
})

app.get('/todos/:id', async (req, res) => {
    const resp = await db.getTodo({_id: req.params.id});
    console.log(req.body, req.params.id, resp, "get")
    res = applyHeaders(res);
    res.status(200).send(resp);
})

const appPort = 5001;
console.info('[INFO] Server is running on port -> ' + appPort);
app.listen(appPort);