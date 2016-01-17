import React, { Component, PropTypes } from 'react';

export default class Loading extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = this.props.show ?
			{ opacity: 1, zIndex: 99 } :
			{ opacity: 0, zIndex: -1 };

		return (
			<div className="loading" style={ style }>
				<p><i className="fa fa-refresh fa-spin fa-fw"></i></p>
			</div>
		);
	}
}
