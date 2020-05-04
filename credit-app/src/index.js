import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';

// import * as serviceWorker from './serviceWorker';

import store from './store/index'
import { changePerson } from './actions/actions'
import { Provider } from 'react-redux'

window.store = store
window.changePerson = changePerson

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
	,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
