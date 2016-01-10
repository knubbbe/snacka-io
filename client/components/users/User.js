const React = require('react');

module.exports = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
	},

	render() {
		const { key, username} = this.props;

		return (
			<li key={key}>{username}</li>
		)
	}
});
