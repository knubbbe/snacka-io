import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/users';

const initialState = {
	isLoggingIn: false,
	response: false,
	userData: false
};

export function user(state = initialState, action) {
	switch(action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isLoggingIn: true
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isLoggingIn: false,
				response: false,
				userData: action.user
			});
		case LOGIN_FAILURE:
			console.log(action);
			return Object.assign({}, state, {
				isLoggingIn: false,
				response: action.response.err
			});
		default:
			return state;
	}
}

export function users(state = [], action) {
	switch(action.type) {

		// case START_TYPING:
		// 	return [
		// 		...state,
		// 		{ isTyping: true }
		// 	];
		//
		// case END_TYPING:
		// 	return [
		// 		...state,
		// 		{ isTyping: false }
		// 	];

		default:
			return state;
	}
}
