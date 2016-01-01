const React = require('react');

module.exports = React.createClass({
    propTypes: {
        user: React.PropTypes.string.isRequired,
		onMessageSubmit: React.PropTypes.func.isRequired
	},

	getInitialState() {
		return { text: '' };
	},

	handleSubmit(e) {
		e.preventDefault();
		const message = {
			user : this.props.user,
			text : this.state.text
		}
		this.props.onMessageSubmit(message);
		this.setState({ text: '' });
	},

	changeHandler(e) {
		this.setState({ text : e.target.value });
	},

	render() {
		return(
			<div className='new-message'>
				<form onSubmit={ this.handleSubmit }>
					<input
						autofocus
						onChange={ this.changeHandler }
						value={ this.state.text } />
				</form>
			</div>
		);
	}
});
