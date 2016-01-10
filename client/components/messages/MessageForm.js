const React = require('react');

module.exports = React.createClass({
    propTypes: {
        user: React.PropTypes.object,
		submitAction: React.PropTypes.func
	},

	getInitialState() {
		return { text: '' };
	},

	_submitMessage(e) {
		e.preventDefault();

        const { user } = this.props;
        const { text } = this.state;

		const message = {
			user : user.username,
			text
		}
		this.props.submitAction(message);
		this.setState({ text: '' });
        this.refs.messageForm.reset();
	},

	_messageChange(e) {
		this.setState({ text : e.target.value });
	},

	render() {
		return(
            <div className='new-message'>
				<form onSubmit={ this._submitMessage } ref='messageForm'>
					<input
						autofocus
						onChange={ this._messageChange }
                        placeholder='write something..'
						value={ this.state.text } />
				</form>
			</div>
		);
	}
});
