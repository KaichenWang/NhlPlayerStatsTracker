import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './containers/reducers'
import App from './containers/app/container'

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware // lets us dispatch() functions
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)