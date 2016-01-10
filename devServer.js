require('babel/register');
const app = require('./server/server').app;
const server = require('./server/server').server;
const routes = require('./server/routes');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const compiler = webpack(config);

const port = isDeveloping ? 3000 : process.env.PORT;
const isDeveloping = process.env.NODE_ENV !== 'production';

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

routes(app);

server.listen(app.get('port'), 'localhost', (err) => {
    if (err) {
        console.log('ERROR:', err);
        return;
    }
    console.log('Listening on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});
