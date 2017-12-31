import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './containers/reducers'
import App from './containers/app/container'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;


let store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
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