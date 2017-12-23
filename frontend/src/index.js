import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'

const logger = store => next => action => {
	console.log(action.type)
	console.group(action.type)
	console.info('dispatching', action)
	let result = next(action)
	console.log('next state', store.getState())
	console.groupEnd(action.type)
	return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(logger, thunk)
		)
	)

ReactDOM.render(
	<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, 
	document.getElementById('root')
);
registerServiceWorker();




