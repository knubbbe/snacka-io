const React = require('react');
const Room = require('./Room');

module.exports = React.createClass({
	propTypes: {
		rooms: React.PropTypes.array.isRequired,
		activeRoom: React.PropTypes.string,
	},

	render() {
		return (
			<div className='room-list list'>
				<h3> <i className="fa fa-comments-o"></i> Rooms </h3>
				<ul>
					{ this.props.rooms.map( (room, i) => {
						return <Room key={i} room={ room } active={ this.props.active } />
					}) }
				</ul>
			</div>
		);
	}
});
