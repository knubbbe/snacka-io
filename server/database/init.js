const path = require('path');
const Datastore= require('nedb');
const sha1 = require('sha1');
const dbPath = path.join( path.dirname(__dirname), '..', 'database-store' );

let db = {};
db.users = new Datastore({ filename: dbPath + '/users.db', autoload: true });
db.messages = new Datastore({ filename: dbPath + '/messages.db', autoload: true });

db.users.ensureIndex({ fieldName: 'username', unique: true }, (err) => {
    console.info('Index Error:', err);
});

module.exports = db;
