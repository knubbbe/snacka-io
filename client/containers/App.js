import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addMessage } from '../actions/messages';
import { login, logout, register } from '../actions/users';
import {
	socketConnect,
	loadingStart,
	loadingEnd,
	alertShow,
	alertHide
} from '../actions/general';

import Loading from
'../components/Loading.js';
import Alert from '../components/Alert.js';
import Login from '../components/Login.js';
import AddMessage from '../components/AddMessage';
import MessageList from '../components/MessageList';

class App extends Component {

	constructor(props) {
		super(props);

		this.props.dispatch(socketConnect());
	}

	componentDidMount() {
		this.props.dispatch(loadingEnd());
	}

	render() {
		const {
			dispatch,
			socket,
			isLoading,
			messages,
			users,
			user
		} = this.props;
		let _content;

		if (!user.userData) {
			_content = (
				<Login
					loginAction={ (username, password) => 		dispatch(login(username, password)) }
					registerAction={ (username, password) => dispatch(register(username, password)) }
					errorAction={ (error) => dispatch(alertShow('', error, 'error')) }
				/>
			);
		} else {
			_content = (
				<div style={{ position: 'relative', paddingBottom: 100 }}>
					<h2>Hello { user.userData.username }</h2>
					<MessageList
						messages={ messages }
					/>
					<AddMessage
						submitAction={ data => dispatch(addMessage(data._id, data.user, data.text, data.date)) }
						user={ user.userData }
					/>
				</div>
			);
		}

		return (
			<div>
				<Loading show={ isLoading} />
				{ _content }
				<Alert settings={ this.props.alert } />
				<button onClick={ () => dispatch(logout()) }>logout</button>
			</div>
		);
	}
}

App.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number.isRequired,
		user: PropTypes.object.isRequired,
		text: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired
	}).isRequired).isRequired
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps(state) {
	return {
		socket: state.general.socket,
		messages: state.messages,
		users: state.users,
		user: state.user,
		isLoading: state.general.isLoading,
		alert: state.general.alert,
		// isTyping: state.isTyping
	};
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
