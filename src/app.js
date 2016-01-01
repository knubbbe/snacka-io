const React = require('react');
const ReactDOM = require('react-dom');
const socket = io.connect();

const UsersList = require('./components/users/UsersList');
const ChangeNameForm = require('./components/users/ChangeNameForm');
const MessageList = require('./components/messages/MessageList');
const MessageForm = require('./components/messages/MessageForm');

const App = React.createClass({

	getInitialState() {
		return {
			users: [],
			messages:[],
			text: '',
			user: ''
		};
	},

	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageRecieve);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
	},

	_initialize(data) {
		let {users, name} = data;
		this.setState({
			users,
			user: name
		});
	},

	_messageRecieve(message) {
		let { messages } = this.state;
		messages.push(message);
		this.setState({messages});
	},

	_userJoined(data) {
		let { users, messages } = this.state;
		let { name } = data;
		users.push(name);
		messages.push({
			user: 'APP BOT',
			text : name +' Joined'
		});
		this.setState({users, messages});
	},

	_userLeft(data) {
		let { users, messages } = this.state;
		let { name } = data;
		const index = users.indexOf(name);

		users.splice(index, 1);
		messages.push({
			user: 'APP BOT',
			text : name +' Left'
		});
		this.setState({users, messages});
	},

	_userChangedName(data) {
		console.log(data);
		let { oldName, newName } = data;
		let { users, messages } = this.state;
		const index = users.indexOf(oldName);
		users.splice(index, 1, newName);
		messages.push({
			user: 'APP BOT',
			text : 'Change Name : ' + oldName + ' ==> '+ newName
		});
		this.setState({
			users,
			messages
		});
	},

	handleMessageSubmit(message) {
		let { messages } = this.state;
		messages.push(message);
		this.setState({messages});
		socket.emit('send:message', message);
	},

	handleChangeName(newName) {
		const oldName = this.state.user;

		socket.emit('change:name', {
			name : newName
		}, (result) => {

			if(!result) return alert('There was an error changing your name');

			let { users } = this.state;
			const index = users.indexOf(oldName);
			users.splice(index, 1, newName);
			this.setState({
				users,
				user: newName
			});
		});
	},

	render() {
		return (
			<div className="app-wrapper">
				<div className="sidebar">
					<div className="header">
						<h1>snacka</h1>
					</div>
					<UsersList users={this.state.users} />
					<ChangeNameForm onChangeName={this.handleChangeName} />
				</div>
				<div className="content">
					<MessageList messages={this.state.messages} />
					<MessageForm onMessageSubmit={this.handleMessageSubmit} user={this.state.user} />
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
