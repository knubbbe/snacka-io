import io from 'socket.io-client';
import { SOCKET_CONNECT, START_LOADING, END_LOADING, SHOW_ALERT, HIDE_ALERT } from '../actions/general';

const initialState = {
	isLoading: false,
	requesting: false,
	alert: {
		show: false
	},
	socket: null
};

export function general(state = initialState, action) {
	switch (action.type) {
		case SOCKET_CONNECT:
			let socket = io.connect();
			return Object.assign({}, state, {
				socket
			});
		case START_LOADING:
			return Object.assign({}, state, {
				isLoading: true
			});;
		case END_LOADING:
			return Object.assign({}, state, {
				isLoading: false
			});
		case SHOW_ALERT:
			return Object.assign({}, state, {
				alert: {
					show: true,
					title: action.title,
					message: action.message,
					alertType: action.alertType
				}
			});
		case END_LOADING:
			return Object.assign({}, state, {
				alert: {
					show: false
				}
			});
		default:
			return state;
	}
}
