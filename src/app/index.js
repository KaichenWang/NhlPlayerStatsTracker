import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import App from './containers/app/container'

import reducers from './containers/reducers'
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const routes = {
    '/': {
        title: 'Home'
    }
};

// Install the router into the store for a browser-only environment.
// routerForBrowser is a factory method that returns a store
// enhancer and a middleware.
const {
    reducer,
    middleware,
    enhancer
} = routerForBrowser({
    // The configured routes. Required.
    routes
})


let store = createStore(
    combineReducers({
        ...reducers,
        router: reducer
    }),
    composeEnhancers(
        enhancer,
        applyMiddleware(
            middleware,
            thunkMiddleware // lets us dispatch() functions
        )
    )
)

const initialLocation = store.getState().router;
if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation));
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)