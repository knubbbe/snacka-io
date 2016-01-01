const db = require('./init');
const sha1 = require('sha1');

module.exports = {

    addUser: (user, cb) => {
        const { username } = user;

        return db.users.insert(
            {
                username,
                password: sha1('1234')
            }, (err, newDoc) => {

                console.info(err);

                if (typeof cb === 'function') {
                    return cb(err);
                }
                return err;
                // resp = err;
                //
                // if (typeof newDoc === undefined) resp = err;

            }
        );
    }

};
