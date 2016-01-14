export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_COMPLETE = 'LOGIN_COMPLETE';


export function login(username, password) {
	return {
		type: LOGIN,
		username,
		password
	};
}

export function loginPending() {
	return { type: LOGIN_PENDING };
}

export function loginComplete() {
	return { type: LOGIN_COMPLETE };
}

// export function startTyping() {
// 	return { type: START_TYPING };
// }
//
// export function endTyping() {
// 	return { type: END_TYPING };
// }
