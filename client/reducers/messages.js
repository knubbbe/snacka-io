import { START_TYPING, END_TYPING, ADD_MESSAGE } from '../actions/messages';

export default function messages(state = [], action) {
	switch (action.type) {
		case ADD_MESSAGE:
			return [
				...state,
				{
				_id: action._id,
				user: action.user,
				text: action.text,
				date: action.date
			}];

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
