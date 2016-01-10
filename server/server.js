const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const socket = require('./socket.js');
const getMessageList = require('./utils/db.js').getMessageList;

const publicPath = path.join(__dirname, '..', 'public');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;


/* Configuration */
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('port', port);

app.use(function(req, res, next) {
	console.log(req.method, req.url, req.body);
	next();
});

app.use(express.static(publicPath + '/'));

/* Socket.io Communication */
const io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

module.exports = {
	app: app,
	server: server
};
