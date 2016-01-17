export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export function socketConnect() {
	return { type: SOCKET_CONNECT };
}

export function loadingStart(element) {
	return { type: START_LOADING, element };
}
export function loadingEnd(element) {
	return { type: END_LOADING, element };
}

export function alertShow(title, message, alertType) {
	return { type: SHOW_ALERT, title, message, alertType };
}
export function alertHide() {
	return { type: HIDE_ALERT };
}
