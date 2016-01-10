const React = require('react');
const request = require('superagent');

module.exports = React.createClass({

	getInitialState() {
		return {
			currentForm: 'login'
		};
	},

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

	_formSwap(e) {
		e.preventDefault();
		const newForm = (this.state.currentForm === 'login')? 'register' : 'login';
		this.setState({
			currentForm: newForm
		});
	},

	render() {

		let loginContainer = (
			<div className='login container'>
				<input
					className='inverse'
					type='text'
					name='username'
					ref='loginUsername'
					placeholder='username' />
				<input
					className='inverse'
					type='password'
					name='password'
					ref='loginPassword'
					placeholder='password' />
				<button className='inverse' onClick={ this._handleLogin }>login</button>
			</div>
		);

		let registerContainer = (
			<div className='register container'>
				<input
					className='inverse'
					type='text'
					name='username'
					ref='registerUsername'
					placeholder='username' />
				<input
					className='inverse'
					type='password'
					name='password'
					ref='registerPassword'
					placeholder='password' />
				<input
					className='inverse'
					type='password'
					name='password'
					ref='registerPasswordCheck'
					placeholder='password again' />
				<button className='inverse' onClick={ this._handleRegister }>register</button>
			</div>
		);

		return (
			<div className='auth'>
				<div className='auth-wrapper'>
					<h1>welcome to <i>snacka</i></h1>
					{ this.state.currentForm === 'login'? loginContainer : registerContainer }
					<a onClick={ this._formSwap }>
						{ this.state.currentForm === 'login'? 'register' : 'login' }
					</a>
				</div>
			</div>
		);
	}

});
