var path = require('path');
var express = require('express');
var http = require('http');
var socket = require('./socket.js');

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config.js');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;

var app = express();
var server = http.createServer(app);

var publicPath = path.join(path.dirname(__dirname), 'public/');

/* Configuration */
app.set('views', __dirname + '/views');
app.use(express.static( publicPath ));
app.set('port', port);

if (isDeveloping) {
	const compiler = webpack(config);
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	// app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('*', function response(req, res) {
		console.log(publicPath + 'index.html');
		res.write(middleware.fileSystem.readFileSync( publicPath + 'index.html' ));
		res.end();
	});
} else {
	app.get('*', function response(req, res) {
		res.sendFile( publicPath + 'index.html');
	});
}

/* Socket.io Communication */
var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

/* Start server */
server.listen(app.get('port'), function (){
  console.log('Express server listening on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
