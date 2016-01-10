const React = require('react');
const request = require('superagent');

module.exports = React.createClass({

	_handleLogin(e) {
		let error = false;
		let username = this.refs.loginUsername.value.trim();
		let password = this.refs.loginPassword.value.trim();

		if (username.length < 1) {
			error = true;
		}
		if (password.length < 6) {
			error = true;
		}

		if (error) {
			console.log('Error: ', error);
		} else {
			this.props.loginAction({ username, password });
		}
	},

	_handleRegister(e) {
		let error = false;
		let username = this.refs.registerUsername.value.trim();
		let password = this.refs.registerPassword.value.trim();

		if (username.length < 3) {
			error = true;
		}
		if (password.length < 6) {
			error = true;
		}

		if (error) {
			console.log('Error: ', error);
		} else {
			this.props.registerAction({ username, password });
		}

	},

	render() {
		return (
			<div className='auth'>
				<div className='login container'>
					<h2>login</h2>
					<input
						type='text'
						name='username'
						ref='loginUsername'
						placeholder='username' />
					<input
						type='password'
						name='password'
						ref='loginPassword'
						placeholder='password' />
					<button onClick={ this._handleLogin }>login</button>
				</div>
				<div className='register container'>
					<h2>register</h2>
					<input
						type='text'
						name='username'
						ref='registerUsername'
						placeholder='username' />
					<input
						type='password'
						name='password'
						ref='registerPassword'
						placeholder='password' />
					<button onClick={ this._handleRegister }>register</button>
				</div>
			</div>
		);
	}

});
