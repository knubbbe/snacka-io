import React, { Component, PropTypes } from 'react';
import Message from './Message';

export default class MessageList extends Component {
	render() {
		return (
			<ul
				style={{
					listStyleType: 'none',
					margin: 0,
					padding: 20
				}}>
				{this.props.messages.length > 0 ?
					this.props.messages.map(message =>
						<Message
							key={message._id}
							{...message} />
					)
				: 'nothing to see here, move along...'
				}
			</ul>
		);
	}
}

MessageList.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number.isRequired,
		user: PropTypes.object.isRequired,
		text: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired
	}).isRequired).isRequired
};
