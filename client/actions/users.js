import request from 'superagent';
import { loadingStart, loadingEnd, alertShow, alertHide } from './general';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginRequest() {
	return { type: LOGIN_REQUEST };
}

export function loginComplete(response) {
	let type = LOGIN_FAILURE;
	if (response.success) {
		type = LOGIN_SUCCESS;
		localStorage.setItem('access_token', user.access_token);
	}
	return {
		type,
		response
	};
}

export function login(username, password) {
	return dispatch => {
		dispatch(loginRequest());
		dispatch(loadingStart());

		return request.post('/api/user/login')
			.send({username, password})
			.end((err, response) => {
				console.log(err, response);
				const data = (response.body.success)? {} : { err: response.body.error };
				dispatch(loginComplete(data));
				dispatch(loadingEnd());
				if (response.body.error) dispatch(alertShow( 'login error', response.body.error, 'error' ));
			});
	}
}
