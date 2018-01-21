import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import App from './containers/app/container'

import reducers from './containers/reducers'
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router'
import { onInitialLoad, setFullscreenMode, setEnterSearchMode } from './containers/app/actions'

import { push } from 'redux-little-router'

import { MAX_PLAYERS, COOKIE_OPTIONS } from './constants'

import Cookies from 'universal-cookie'

import { parseQueryToArray, parseArrayToQuery } from './utils'

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

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

const initialLocation = store.getState().router
const cookies = new Cookies();
let cookiePlayers
if (!!initialLocation.query.players) {
    cookies.set('path',initialLocation.query.players, COOKIE_OPTIONS)
}
else {
    cookiePlayers = cookies.get('path')
}
if (initialLocation) {
    const queryPlayers = !!cookiePlayers ? cookiePlayers : initialLocation.query.players
    if(!!queryPlayers && queryPlayers.length > 0) {
        const playerIds = parseQueryToArray(queryPlayers)
        const limited =  playerIds.slice(0, MAX_PLAYERS)

        const unique = limited.filter(function(item, pos) {
            return limited.indexOf(item) == pos;
        })

        store.dispatch(onInitialLoad(unique))
        store.dispatch(push({
            query: {
                players: parseArrayToQuery(unique)
            }
        }))
    }
    else {
        store.dispatch(setFullscreenMode(false))
        store.dispatch(setEnterSearchMode())
    }
}
const cookieFullscreen = cookies.get('fullscreen')
if (!!cookieFullscreen) {
    store.dispatch(setFullscreenMode(cookieFullscreen !== "false"))
}