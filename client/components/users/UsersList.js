const React = require('react');
const User = require('./User');

module.exports = React.createClass({
	render() {
		return (
			<div className='user-list list'>
				<h3> <i className="fa fa-users"></i> Online </h3>
				<ul>
					{ this.props.users.map( (user, i) => {
						return <User key={i} username={ user } />
					}) }
				</ul>
			</div>
		);
	}
});
