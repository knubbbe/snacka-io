import {
	LOGOUT_REQUEST,
	LOGOUT_COMPLETE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE
} from '../actions/users';

const initialState = {
	requesting: false,
	response: false,
	userData: false
};

export function user(state = initialState, action) {
	switch(action.type) {
		case LOGIN_REQUEST || REGISTER_REQUEST || LOGOUT_REQUEST:
			return Object.assign({}, state, {
				requesting: true
			});
		case LOGOUT_COMPLETE:
			return Object.assign({}, state, {
				requesting: false,
				response: false,
				userData: false
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				requesting: false,
				response: false,
				userData: action.user
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				requesting: false
			});
		case REGISTER_SUCCESS:
			return Object.assign({}, state, {
				requesting: false,
				response: false,
				userData: action.user
			});
		case REGISTER_FAILURE:
			return Object.assign({}, state, {
				requesting: false
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
