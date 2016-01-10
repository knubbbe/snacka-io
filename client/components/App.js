const React = require('react');
const socket = io.connect();
const request = require('superagent');
const config = require('../../config');

const UsersList = require('./users/UsersList');
const RoomsList = require('./rooms/RoomsList');
const CreateRoomForm = require('./rooms/CreateRoomForm');
const ChangeNameForm = require('./users/ChangeNameForm');
const MessageList = require('./messages/MessageList');
const MessageForm = require('./messages/MessageForm');

module.exports = React.createClass({

	getInitialState() {
		return {
			users: [],
			rooms:[],
			messages:[],
			text: '',
			activeRoom: ''
		};
	},

	componentWillMount() {
		request.post('/api/message/list')
			.send({ room: 'lobby' })
			.end( (err, res) => {
				const { body } = res;
				this.setState({ messages: body });
			});

		request.post('/api/room/list')
			.end( (err, res) => {
				const { body } = res;
				this.setState({ rooms: body });
			});
	},

	componentDidMount() {
		socket.on('init:ready', this._init);
		socket.on('send:message', this._messageRecieve);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
		socket.on('room:created', this._roomCreated);

		this._setupUsers();
	},

	_setupUsers() {
		const { users } = this.props;
		this.setState({
			users
		});
	},

	_messageRecieve(message) {
		let { messages } = this.state;
		messages.push(message);
		this.setState({ messages });
	},

	_roomCreated(room) {
		const message = {
			user: config.botName,
			text : room.title +' was created'
		};
		this.setState({
			rooms: this.state.rooms.concat([room]),
			messages: this.state.messages.concat([message])
		});
	},

	_userJoined(data) {
		const { username } = data;
		const message = {
			user: config.botName,
			text : username +' Joined'
		};
		console.log('user:join', data);
		this.setState({
			users: this.state.users.push(username),
			messages: this.state.messages.concat([message])
		});
	},

	_userLeft(data) {
		const { username } = data;
		const index = this.state.users.indexOf(username);
		const message = {
			user: config.botName,
			text : username +' Left'
		};

		this.setState({
			users: this.state.users.splice(index, 1),
			messages: this.state.messages.concat([message])
		});
	},

	// _userChangedName(data) {
	// 	let { oldName, newName } = data;
	// 	let { users, messages } = this.state;
	// 	const index = users.indexOf(oldName);
	// 	users.splice(index, 1, newName);
	// 	messages.push({
	// 		user: config.botName,
	// 		text : 'Change Name : ' + oldName + ' ==> '+ newName
	// 	});
	// 	this.setState({
	// 		users,
	// 		messages
	// 	});
	// },

	handleMessageSubmit(message) {

		this.setState({
			messages: this.state.messages.concat([message])
		});
		socket.emit('send:message', message);

	},

	handleCreateRoom(room) {
		console.log('handleCreateRoom', room);

		socket.emit('room:create', room, (result) => {
			console.log('room:create result', result);

			if(!result) return alert('There was an error creating the room');

			this.setState({
				rooms: this.state.rooms.concat([result])
			});
		});
	},

	// handleChangeName(newName) {
	// 	const oldName = this.props.user.username;
	//
	// 	socket.emit('change:name', {
	// 		name : newName
	// 	}, (result) => {
	// 		if(!result) return alert('There was an error changing your name');
	//
	// 		let { users } = this.state;
	// 		const index = users.indexOf(oldName);
	// 		let userState = {
	// 			username: newName,
	// 			activeRoom: this.props.user.activeRoom
	// 		}
	//
	// 		users.splice(index, 1, newName);
	// 		this.setState({
	// 			users,
	// 			user: userState
	// 		});
	// 	});
	// },

	render() {
		return (
			<div className="app-wrapper">
				<div className="sidebar">
					<div className="header">
						<h1>snacka</h1>
					</div>
					<UsersList users={this.state.users} />
					<RoomsList rooms={this.state.rooms} active={this.props.currentUser.activeRoom} />
					<CreateRoomForm submitAction={this.handleCreateRoom} />
				</div>
				<div className="content">
					<MessageList messages={this.state.messages} />
					<MessageForm submitAction={this.handleMessageSubmit} user={this.props.currentUser} />
				</div>
			</div>
		);
	}
});
