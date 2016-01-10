const nedb = require('nedb');
const path = require('path');
const sha1 = require('sha1');
const hat = require('hat');
const { dbPath } = require('../../config');

let db = {};
db.user = new nedb({ filename: path.join(dbPath, 'users.db'), autoload: true });
db.message = new nedb({ filename: path.join(dbPath, 'messages.db'), autoload: true });
db.room = new nedb({ filename: path.join(dbPath, 'rooms.db'), autoload: true });

db.user.ensureIndex({ fieldName: 'username', unique: true });
db.room.ensureIndex({ fieldName: 'title', unique: true });

const createUser = ( (req, res, next) => {

    const { username, password } = req.body;
    const _password = sha1(password);
    const access_token = hat();

    db.user.insert({
        username,
        password: _password,
        activeRoom: '2buW2dI2LFR1BegH',
        access_token
    }, (err, doc) => {
        if (err) res.send({ success: false, error: err.errorType });

        res.send({ success: true, access_token: doc.access_token });
    });
});

const loginUser = ( (req, res ,next) => {
    const { username, password } = req.body;

    db.user.findOne({ username: username },  (err, doc) => {
        if (err) res.send({ success: false, error: err.errorType });

        if (doc.password !== sha1(password)) {
            res.send({ success: false, error: 'wrong password' });
        } else {
            res.send({ success: true, user: doc });
        }
    });
});

const authUser = ( (access_token, cb) => {
    cb = cb || function() {};
    // const { access_token } = req.body;

    db.user.findOne({ access_token },  (err, doc) => {
        if (err) res.send({ success: false, error: err.errorType });

        cb({ success: true, user: doc});
        // res.send({ success: true, user: doc });
    });
});

const getUserById = ( (req, res, next) => {

    const { params } = res;

    db.user.findOne({ _id: params.id}, (err, doc) => {
        if (err) throw err;
        res.send(doc);
    });
});

const addMessage = ( (obj) => {

    const { user, text } = obj;

    db.message.insert({
        user,
        text,
        room: '2buW2dI2LFR1BegH',
        time: new Date()
    });
});

const getMessageList = ( (req, res, next) => {
    const args = req.body || {};

    db.message.find(args).sort({ time: -1 }).exec( (err, docs) => {
        if (err) throw err;

        let arr = [];
        docs.map( doc => {
            arr.push(doc);
        });
        res.send(arr);
    });
});

const getRoomList = ( (req, res, next) => {
    const args = req.body || {};

    db.room.find(args).sort({ time: -1 }).exec( (err, docs) => {
        if (err) throw err;

        let arr = [];
        docs.map( doc => {
            arr.push(doc);
        });
        res.send(arr);
    });
});
const createRoom = ( (obj) => {
    const { title, description, admins } = obj;

    db.room.insert({
        title,
        description,
        admins
    });
});



const createLobbyRoom = () => {
    db.room.find({ title: 'Lobby' }, (err, doc) => {
        if (err) throw err;

        if (!doc.length) {
            db.room.insert({
                title: 'Lobby',
                description: 'The place to be!',
                admins: {}
            });
        }
    });
}
createLobbyRoom();

module.exports = {
    addMessage,
    getMessageList,
    getRoomList,
    createRoom,
    getUserById,
    createUser,
    loginUser,
    authUser
};
