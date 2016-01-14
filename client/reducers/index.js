import { combineReducers } from 'redux';
import { general } from './general';
import messages from './messages';
import { users, user } from './users';

const rootReducer = combineReducers({
	general,
	messages,
	users,
	user
});

export default rootReducer;
