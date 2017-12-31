import {combineReducers} from 'redux'

import app from './app/reducer'
import playerSearch from './player-search/reducer'



const rootReducer = combineReducers({
    app,
    playerSearch
})

export default rootReducer
