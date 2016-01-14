import { LOGIN, LOGIN_PENDING, LOGIN_COMPLETE } from '../actions/users';
import { getUserFromStorage } from '../utils/users';

const initialState = getUserFromStorage();

export function user(state = initialState, action) {
	switch(action.type) {
		case LOGIN:
			action.dispath(loginPending());
			// todo: request user auth from api
			return 	{
				username: action.username,
				password: action.password
			};
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
