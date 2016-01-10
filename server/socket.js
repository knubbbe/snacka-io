const userUtils = require('./utils/socket-users');
const { addMessage, createRoom, authUser }= require('./utils/db');

// export function for listening to the socket
module.exports = (socket) => {
    // let name = Users.getGuestName();
    let username;

    // send the new user their name and a list of users
    // socket.emit('init', {
    //     name: name,
    //     users: Users.get()
    // });

    socket.on('init', (data) => {
        authUser(data, (res) => {
            const { user } = res;
            username = user.username;
            userUtils.claim(username);
            socket.emit('init:ready', {
                users: userUtils.get(),
                user: user
            });
            socket.broadcast.emit('user:join', {
                username
            });
        });
    });

    // // notify other clients that a new user has joined
    // socket.broadcast.emit('user:join', {
    //     username
    // });

    // broadcast a user's message to other users
    socket.on('send:message', (data) => {
        const { user, text } = data;

        addMessage({ user: username, text });
        socket.broadcast.emit('send:message', {
            user: username,
            text
        });
    });

    // validate a user's name change, and broadcast it on success
    socket.on('change:name', (data, fn) => {
        if (userUtils.claim(data.name)) {

            const oldName = name;

            userUtils.free(oldName);

            name = data.name;

            UsersDB.addUser({ username: name }, (data) => {
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

    // broadcast a user creates a new room
    socket.on('room:create', (data) =>  {
        const { user, title, description } = data;

        createRoom({
            title,
            description,
            admins: { username }
        });
        socket.broadcast.emit('room:created', {
            user: username,
            title,
            description
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', () => {
        socket.broadcast.emit('user:left', {
            username
        });
        userUtils.free(username);
    });
};
