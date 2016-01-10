const React = require('react');

module.exports = React.createClass({
	propTypes: {
		room: React.PropTypes.object.isRequired,
	},

	render() {
		const { key, room, active } = this.props;
		return (
			<li key={key} title={ room.description } className={ (active === room._id)? 'active' : '' }>{ room.title }</li>
		)
	}
});
