const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

module.exports = io;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//actions
const {createTask, checkTask, getList, } = require('./actions/actions');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/socket.io'));

app.get('/create', createTask);
app.get('/check/:id', checkTask);
app.get('/list', getList);

io.sockets.on('connect', function (client) {
    client.on('/create', function(data) {
        client.emit('statusMessage', data);
    })
});

server.listen(8889, () => console.log('Listening on http://localhost:8889'));
