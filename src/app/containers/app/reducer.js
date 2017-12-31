import {createReducer} from 'redux-act'
import * as actions from './actions'

const initialState = {
    players: {},
    stats: {}
}

export default createReducer({
    [actions.addPlayer]: (state, player) => {
        const players = {}
        players[player.id] = player
        return Object.assign({}, state, {
            players: {
                ...state.players,
                ...players
            }
        })
    },
    [actions.removePlayer]: (state, id) => {
        const players = Object.keys(state.players).reduce((obj, key) => {
            if (key !== id) {
                return { ...obj, [key]: state.players[key] }
            }
            return obj
        }, {})

        return Object.assign({}, state, {
            players
        })
    }
}, initialState)


