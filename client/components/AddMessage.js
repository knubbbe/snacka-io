import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class AddMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			isTyping: false
		 };

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		const inputStyle = (this.state.isTyping)? '#444' : '#efefef';

		return (
			<div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
				<form
					style={{ margin: 0 }}
					onSubmit={ (e) => this.handleSubmit(e) }>
					<input
						type='text'
						ref='input'
						style={{
							width: '100%',
							padding: '10px 20px',
							fontSize: '3rem',
							outline: 0,
							border: '1px solid ',
							borderColor: inputStyle,
						}}
						onChange={ (e) => this.handleChange(e) }
						onBlur={ (e) => this.handleBlur(e) }
						value={ this.state.text }
						placeholder="write a message..." />
				</form>
			</div>
		);
	}

	handleBlur(e) {
		this.setState({
			isTyping: false
		});
	}

	handleChange(e) {
		const node = ReactDOM.findDOMNode(this.refs.input);

		this.setState({
			text: node.value,
			isTyping: true
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.submitAction({
			_id: Math.random(0,9999),
			user: { username: 'knubbe', title: 'dev' },
			text: this.state.text,
			date: new Date().toISOString()
		});
		this.setState({
			text: '',
			isTyping: false
		});
	}
}

AddMessage.propTypes = {
	submitAction: PropTypes.func.isRequired
};
