import {combineReducers} from 'redux'

import app from './app/reducer'
import playerSearch from './player-search/reducer'

const reducers = {
    app,
    playerSearch
}

export default reducers
