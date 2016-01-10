require('babel/register');
const app = require('./server/server').app;
const server = require('./server/server').server;

require('./server/routes')(app);

server.listen(app.get('port'), () => {
  console.log('Listening on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});
