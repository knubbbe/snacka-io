var path = require('path');
const {
    getMessageList,
    getRoomList,
    getUserById,
    createUser,
    loginUser,
    authUser
} = require('./utils/db');
var publicPath = path.join(__dirname, '..', 'public');

module.exports = function(app) {
    app.get('/*', function response(req, res) {
    	res.sendFile( path.join(publicPath, 'index.html'));
    });
    app.post('/api/message/list', getMessageList);
    app.post('/api/room/list', getRoomList);
    app.post('/api/user/register', createUser);
    app.post('/api/user/login', loginUser);
    app.post('/api/user/auth', authUser);
    app.post('/api/user/:id', getUserById);
};
