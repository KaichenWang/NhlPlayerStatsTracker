import {createReducer} from 'redux-act'
import * as actions from './actions'

const initialState = {
    results: {}
}

export default createReducer({
    [actions.setResults]: (state, payload) => {
        const results = {}
        for (const str of payload.suggestions) {
            const info = str.split('|')
            results[info[0]] = {
                id: info[0],
                lastName: info[1],
                firstName: info[2],
                team: info[11]
            }
        }

        return Object.assign({}, state, {
            results
        })
    }
}, initialState)



