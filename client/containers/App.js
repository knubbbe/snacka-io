import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addMessage } from '../actions/messages';
import { login } from '../actions/users';
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

		if (!user.data) {
			_content = <Login loginAction={ (username, password) => dispatch(login(username, password)) }
			/>
		} else {
			_content = (
				<div style={{ position: 'relative', paddingBottom: 100 }}>
					<MessageList
						messages={ messages }
					/>
					<AddMessage
						submitAction={ data => dispatch(addMessage(data._id, data.user, data.text, data.date)) }
					/>
				</div>
			);
		}

		return (
			<div>
				<Loading show={ isLoading} />
				{ _content }
				<Alert settings={ this.props.alert } />
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
		requesting: state.general.requesting
		// isTyping: state.isTyping
	};
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
