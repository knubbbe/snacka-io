import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const style = (this.props.settings.show)? { opacity: 1, zIndex: 89 } : { opacity: 0, zIndex: -1 };

		return (
			<div className={ 'alert ' + this.props.settings.alertType } style={style}>
				<div className="alert-wrapper">
					{ this.props.settings.title? <h4>{ this.props.settings.title }</h4> : '' }
					<p>{ this.props.settings.message }</p>
				</div>
			</div>
		)
	}
}
