import { combineReducers } from 'redux';
import messages from './messages';
import { users, user } from './users';

const rootReducer = combineReducers({
	messages,
	users,
	user
});

export default rootReducer;
