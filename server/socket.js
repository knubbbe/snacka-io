const Users = require('./utils/socket-users');
const db = require('./database/users');

// export function for listening to the socket
module.exports = (socket) => {
    let name = Users.getGuestName();

    // send the new user their name and a list of users
    socket.emit('init', {
        name: name,
        users: Users.get()
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
        name: name
    });

    // broadcast a user's message to other users
    socket.on('send:message', (data) => {
        socket.broadcast.emit('send:message', {
            user: name,
            text: data.text
        });
    });

    // validate a user's name change, and broadcast it on success
    socket.on('change:name', (data, fn) => {
        if (Users.claim(data.name)) {

            const oldName = name;

            Users.free(oldName);

            name = data.name;

            db.addUser({ username: name }, (data) => {
                console.info('socket', data);
                console.info(oldName + ' changed name to: ' + name);

                socket.broadcast.emit('change:name', {
                    oldName: oldName,
                    newName: name
                });

                fn(data);

            });


        } else {
            fn(false);
        }
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', () => {
        socket.broadcast.emit('user:left', {
            name: name
        });
        Users.free(name);
    });
};
