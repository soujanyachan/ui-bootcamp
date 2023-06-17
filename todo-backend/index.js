'use strict';
const _ = require('lodash');
const express = require('express');
const db = require('./db');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/health-check', (req, res) => {
    res.send('UP');
});

app.post('/todos', async (req, res) => {
    console.log(req.body);
    const resp = await db.createTodo(req.body);
    res.status(200).send(resp);
})

app.put('/todos/:id', async (req, res) => {
    const resp = await db.updateTodo(req.body);
    res.status(200).send(resp);
})

app.delete('/todos/:id', async (req, res) => {
    const resp = await db.deleteTodo(req.body);
    res.status(200).send(resp);
})
app.get('/todos', async (req, res) => {
    const resp = await db.getAllTodos(req.body);
    res.status(200).send(resp);
})

app.get('/todos/:id', async (req, res) => {
    const resp = await db.getTodo(req.body);
    res.status(200).send(resp);
})

const appPort = 5001;
console.info('[INFO] Server is running on port -> ' + appPort);
app.listen(appPort);