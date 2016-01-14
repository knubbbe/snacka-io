import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootReducer from './reducers';
import '!style!css!sass!./stylesheet/index.scss';
// import configureStore from './store/configureStore';

let store = createStore(rootReducer);
// let store = configureStore();
let rootElement = document.getElementById('root');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
