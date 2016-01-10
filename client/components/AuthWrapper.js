const React = require('react');
const Layout = require('./Layout');
const NotAuthed = require('./NotAuthed');

module.exports = React.createClass({
	propTypes: {
		user: React.PropTypes.object
	},

	render() {
		let { user, users } = this.props;
		return (
			<div>
				{ user.username !== undefined? <Layout currentUser={ user } users={ users } /> : <NotAuthed loginAction={ this.props.handleLogin } registerAction={ this.props.handleRegister } /> }
			</div>
		);
	}

});
