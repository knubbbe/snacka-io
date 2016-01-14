import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addMessage } from '../actions/messages';
import { login } from '../actions/users';

import Login from '../components/Login.js';
import AddMessage from '../components/AddMessage';
import MessageList from '../components/MessageList';

class App extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		// Injected by connect() call:
		const { dispatch, messages, users, user } = this.props;
		let _content;

		if (!user) {
			_content =<Login />;
		} else {
			_content = (
				<div style={{
					position: 'relative',
					// height: '100%',
					paddingBottom: 100
				}}>
				<MessageList
				messages={ messages } />
				<AddMessage
				submitAction={
					data => dispatch(addMessage(data._id, data.user, data.text, data.date))
				} />
				</div>
			);
		}

		return _content;
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
		messages: state.messages,
		users: state.users,
		user: state.user
		// isTyping: state.isTyping
	};
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
