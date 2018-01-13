import {createReducer} from 'redux-act'
import * as actions from './actions'

const initialState = {
    query: '',
    results: {},
    isResultsLoading: false
}

export default createReducer({
    [actions.setQuery]: (state, query) => {
        return Object.assign({}, state, {
            query
        })
    },
    [actions.setResults]: (state, payload) => {
        const results = {}
        for (const str of payload.suggestions) {
            const info = str.split('|')
            results[info[0]] = {
                id: info[0],
                lastName: info[1],
                firstName: info[2],
                team: info[11],
                pos: info[12]
            }
        }

        return Object.assign({}, state, {
            results
        })
    },
    [actions.setLoading]: (state, isResultsLoading) => {
        return Object.assign({}, state, {
            isResultsLoading
        })
    }
}, initialState)



