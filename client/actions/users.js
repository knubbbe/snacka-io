import request from 'superagent';
import { loadingStart, loadingEnd, alertShow, alertHide } from './general';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE';

export function registerRequest() {
	return { type: REGISTER_REQUEST };
}
function registerFailure(user) {
	return {
		type: REGISTER_FAILURE,
	}
}
function registerSuccess(user) {
	return {
		type: REGISTER_SUCCESS,
		user
	}
}
export function registerComplete(response) {
	return dispatch => {
		let type = REGISTER_FAILURE;
		console.log(response);
		if (response.success) {
			type = REGISTER_SUCCESS;
			localStorage.setItem('token', response.token);
			dispatch(registerSuccess(response.user));
		} else {
			dispatch(alertShow( 'register error', response.err,  'error' ));
		}
		dispatch(loadingEnd());
	}
}
export function register(username, password) {
	return dispatch => {
		dispatch(loadingStart());
		dispatch(registerRequest());

		return request.post('/api/user/register')
			.send({username, password})
			.end((err, response) => {
				console.log(err, response);
				const data = (response.body.success)? { success: true, token: response.body.token } : { err: response.body.error };
				dispatch(registerComplete(data));
			});
	}
}

export function loginRequest() {
	return { type: LOGIN_REQUEST };
}
function loginFailure() {
	return {
		type: LOGIN_FAILURE
	}
}
function loginSuccess(user) {
	return {
		type: LOGIN_SUCCESS,
		user: user
	}
}
function loginComplete(response) {
	return dispatch => {
		console.log('LOGINCOMPLETE', response);
		let type = LOGIN_FAILURE;
		if (response.success) {
			type = LOGIN_SUCCESS;
			localStorage.setItem('token', response.token);
			dispatch(loginSuccess(response.user));
		} else {
			dispatch(alertShow( 'login error', response.err, 'error' ));
		}
		dispatch(loadingEnd());
	}
}
export function login(username, password) {
	return dispatch => {
		dispatch(loadingStart());
		dispatch(loginRequest());

		return request.post('/api/user/login')
			.send({username, password})
			.end((err, response) => {

				const user = response.body.user;
				const data = (response.body.success)?
					{ success: true, user, token: user.token } :
					{ err: response.body.error };
				dispatch(loginComplete(data));
			});
	}
}

export function auth(token) {
	return dispatch => {
		dispatch(loginRequest());

		return request.post('/api/user/auth')
			.send({ token })
			.end((err, response) => {
				const user = response.body.user;
				const data = (response.body.success)?
					{ success: true, user, token  } :
					{ err: response.body.error };
				dispatch(loginComplete(data));
			});
	}
}

function logoutRequest() {
	return {
		type: LOGOUT_REQUEST
	}
}
function logoutComplete() {
	return {
		type: LOGOUT_COMPLETE
	}
}
export function logout() {
	return dispatch => {
		dispatch(logoutRequest());
		localStorage.removeItem('token');
		dispatch(logoutComplete());
	}
}
