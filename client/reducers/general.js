import io from 'socket.io-client';
import { SOCKET_CONNECT, START_LOADING, END_LOADING } from '../actions/general';

const initialState = {
	isLoading: false,
	requesting: false,
	socket: null
};

export function general(state = initialState, action) {
	switch (action.type) {
		case SOCKET_CONNECT:
			let socket = io.connect();
			return { socket };
		case START_LOADING:
			return { isLoading: true };
		case END_LOADING:
			return { isLoading: false };
		default:
			return state;
	}
}
