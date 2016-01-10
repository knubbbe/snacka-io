const React = require('react');

module.exports = React.createClass({
	propTypes: {
		submitAction: React.PropTypes.func.isRequired
	},

	getInitialState() {
		return {
            title: '',
            description: ''
        };
	},

	_handleTitleChange(e) {
		this.setState({ title : e.target.value });
	},

	_handleDescriptionChange(e) {
		this.setState({ description : e.target.value });
	},

	handleSubmit(e) {
		console.log('createRoom');
		e.preventDefault();

		const { title, description } = this.state;

        console.log('new room', title, description);

		this.props.submitAction({ title, description });
		this.setState({
            title: '',
            description: ''
        });
        this.refs.createRoomForm.reset();
	},

	render() {
		return(
			<div className='create-room-form form'>
				<h3> <i className='fa fa-plus'></i> create room </h3>
				<form onSubmit={ this.handleSubmit } ref='createRoomForm'>
					<input
						type='text'
                        className='inverse'
                        placeholder='room title'
						onChange={ this._handleTitleChange }
						value={ this.state.title}
					/>
					<input
						type='text'
                        className='inverse'
                        placeholder='room description'
						onChange={ this._handleDescriptionChange }
						value={ this.state.description}
					/>
					<button type='submit'>create</button>
				</form>
			</div>
		);
	}
});
