const React = require('react');
const socket = io.connect();
const request = require('superagent');
const App = require('./App');
const Login = require('./Login');

module.exports = React.createClass({

	getInitialState() {
		return {
			currentUser: {},
			users: []
		};
	},

	componentWillMount() {
		this.userInit();
	},

	userInit() {
		const { access_token } = localStorage;
		const that = this;

		if (access_token !== undefined) {

			socket.emit('init', access_token);
			socket.on('init:ready', (data) => {
				const { users, user } = data;
				console.log('init:ready', users);
				this.setState({
					currentUser: user,
					users
				});
			});

		}
	},

	handleLogin(user) {
		const that = this;
		const { username, password } = user;

		request.post('/api/user/login')
		.send({ username, password })
		.end( (err, res) => {
			if (err) throw err;

			const { body } = res;
			if(body.success) {
				const { user } = body;
				that.setState({
					currentUser: user
				});
				localStorage.setItem('access_token', user.access_token);
				that.userInit();
			}
		});
	},

	handleRegister(user) {
		const that = this;
		const { username, password } = user;

		request.post('/api/user/register')
		.send({ username, password })
		.end( (err, res) => {
			if (err) throw err;

			const { body } = res;
			if(body.success) {
				localStorage.setItem('access_token', body.access_token);
				that.userInit();
			}
		});
	},

	render() {
		let { currentUser, users } = this.state;
		return (
			<div>
				{ currentUser.username !== undefined? <App currentUser={ currentUser } users={ users } /> : <Login loginAction={ this.handleLogin } registerAction={ this.handleRegister } /> }
			</div>
		);
	}

});
