const React = require('react');
const ReactDOM = require('react-dom');
const socket = io.connect();
const request = require('superagent');

const AuthWrapper = require('./components/AuthWrapper');
const styles = require('!style!css!sass!./stylesheet/index.scss');

const App = React.createClass({

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
				console.log(users);
				that.setState({
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
		return (
			<div className="app-wrapper">
				<AuthWrapper user={this.state.currentUser} handleLogin={ this.handleLogin } handleRegister={ this.handleRegister } users={ this.state.users } />
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
