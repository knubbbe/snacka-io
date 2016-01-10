const React = require('react');

module.exports = React.createClass({
	propTypes: {
		user: React.PropTypes.string.isRequired,
	},

	render() {
		return (
			<div className="message">
				<strong>{this.props.user}:</strong>
				<span>{this.props.text}</span>
			</div>
		);
	}
});
