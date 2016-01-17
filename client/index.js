import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootReducer from './reducers';
import { loadingStart } from './actions/general';
import { auth } from './actions/users';
import '!style!css!sass!./stylesheet/index.scss';
import configureStore from './store/configureStore';

// let store = createStore(rootReducer);
let store = configureStore();
let rootElement = document.getElementById('root');

store.dispatch(loadingStart());
const authtoken = localStorage.getItem('token');
if (authtoken) {
	store.dispatch(auth(authtoken));
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
