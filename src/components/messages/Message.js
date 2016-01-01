const React = require('react');

module.exports = React.createClass({
	render() {
		return (
			<div className="message">
				<strong>{this.props.user}:</strong>
				<span>{this.props.text}</span>
			</div>
		);
	}
});
