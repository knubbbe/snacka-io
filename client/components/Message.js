import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
	render() {
		const { user, text, date } = this.props;

		const _date = new Date(date);
		const formatted_date = _date.getDate() + '/' + (_date.getMonth()+1) + ' ' + _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();

		return (
			<li
				style={{
					padding: 20,
					fontSize: '1.1rem'
				}}>
				<h4 style={{ margin: 0, float: 'left' }}>
					{user.username} ({user.title})
				</h4>
				<date style={{ float: 'right', color: '#999' }} date={date}>
					{formatted_date}
				</date>
				<div style={{ fontSize: '1.5rem', clear: 'both' }}>
					{text}
				</div>
			</li>
		);
	}
}

Message.propTypes = {
	_id: PropTypes.number.isRequired,
	user: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
};
