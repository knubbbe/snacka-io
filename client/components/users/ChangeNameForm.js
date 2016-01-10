const React = require('react');

module.exports = React.createClass({
    propTypes: {
		onChangeName: React.PropTypes.func.isRequired
	},

	getInitialState() {
		return {newName: ''};
	},

	onKey(e) {
		this.setState({ newName : e.target.value });
	},

	handleSubmit(e) {
		e.preventDefault();
		const newName = this.state.newName;

		this.props.onChangeName(newName);
		this.setState({ newName: '' });
	},

	render() {
		return(
			<div className='change-name-form'>
				<h3> <i className="fa fa-pencil"></i> Change name </h3>
				<form onSubmit={this.handleSubmit}>
					<input
                        className="inverse"
						onChange={this.onKey}
						value={this.state.newName} />
				</form>
			</div>
		);
	}
});
