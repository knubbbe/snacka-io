import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: 'login',
			username: '',
			password: '',
			password_repeat: ''
		};
	}

	render() {
		const loginElem = (
			<div className="container">
				<h1>login</h1>
				<input type="text" ref="login_username" />
				<input type="password" ref="login_password" />
			</div>
		);
		const registerElem = (
			<div className="container">
				<h1>register</h1>
				<input type="text" ref="register_username" />
				<input type="password" ref="register_password" />
				<input type="password" ref="register_password_repeat" />
			</div>
		);

		return (
			<div className="auth">
				<div className="auth-wrapper">
					<form onSubmit={ (e) => this.handleSubmit(e) }>
						<h1>{this.state.form}</h1>
						<input
							type="text"
							ref="username"
							value={ this.state.username }
							onChange={ (e) => { this.setState({ username: e.target.value }); } }
						/>
						<input
							type="password"
							ref="password"
							value={ this.state.password }
							onChange={ (e) => { this.setState({ password: e.target.value }); } }
						/>
						{ this.state.form === 'register'?
							<input
								type="password"
								ref="password_repeat"
								value={ this.state.password_repeat }
								onChange={ (e) => { this.setState({ password_repeat: e.target.value }); } }
							/> :
							'' }
						<button type="submit">submit</button>
					</form>
					<a onClick={(e) => {
						e.preventDefault();
						const new_form = (this.state.form === 'login')? 'register' : 'login';
						this.setState({ form: new_form });
					}}>{ this.state.form === 'login'? 'register' : 'login'}</a>
				</div>
			</div>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const type = this.state.form;
		const username = this.state.username;
		const password = this.state.password;
		const password_repeat = this.state.password_repeat;
		let error = false;

		if (username.length < 1) error = 'short username';
		if (password.length < 4) error = 'short password';

		if (error) {
			console.log('Error: ', error);
		} else {
			if (type === 'login') {
				this.props.loginAction(username, password);
			}
		}
	}
}
