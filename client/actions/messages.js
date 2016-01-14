export const START_TYPING = 'STARTED_TYPING';
export const END_TYPING = 'END_TYPING';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(_id, user, text, date) {
	return {
		type: ADD_MESSAGE,
		_id,
		user,
		text,
		date
	};
}

// export function startTyping() {
// 	return { type: START_TYPING };
// }
//
// export function endTyping() {
// 	return { type: END_TYPING };
// }
