const React = require('react');

const Message = require('./Message');

module.exports = React.createClass({
    propTypes: {
		messages: React.PropTypes.array.isRequired,
	},

	render() {
		return (
			<div className='messages'>
				{ (this.props.messages.length < 1)?
					<em>nothing to see here, move along..</em> : '' }
				{ this.props.messages.map( (message, i) => {
					return (
						<Message
							key={i}
							user={message.user}
							text={message.text} />
						);
					}) }
			</div>
		);
	}
});
