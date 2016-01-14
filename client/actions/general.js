export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export function socketConnect() {
	return { type: SOCKET_CONNECT };
}

export function loadingStart(element) {
	return { type: START_LOADING, element };
}

export function loadingEnd(element) {
	return { type: END_LOADING, element };
}
