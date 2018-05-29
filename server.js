const express = require('express');
const app = express();

//actions
const {createTask, checkTask, getList, } = require('./actions/actions');

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/create', createTask);
app.get('/check/:id', checkTask);
app.get('/list', getList);

app.listen(8888, () => console.log('Listening on http://localhost:8888'));
