import {createReducer} from 'redux-act'
import * as actions from './actions'
import {  } from 'redux-little-router';

const initialState = {
    players: {},
    stats: {},
    isSearchMode : false,
    isCommentMode: false
}

export default createReducer({
    [actions.setPlayer]: (state, player) => {
        const players = {}
        players[player.id] = player
        return Object.assign({}, state, {
            players: {
                ...state.players,
                ...players
            }
        })
    },
    [actions.unsetPlayer]: (state, id) => {
        const players = Object.keys(state.players).reduce((obj, key) => {
            if (key !== String(id)) {
                return { ...obj, [key]: state.players[key] }
            }
            return obj
        }, {})

        return Object.assign({}, state, {
            players
        })
    },
    [actions.unsetAllPlayers]: (state) => {
        return Object.assign({}, state, {
            players: {}
        })
    },
    [actions.setStats]: (state, payload) => {
        const stats = {}
        const allStats = payload.data.people[0].stats[0].splits
        const currentStats = allStats.find((obj) => {
            return obj.season === '20172018'
        }).stat
        stats[payload.playerId] = currentStats

        return Object.assign({}, state, {
            stats: {
                ...state.stats,
                ...stats
            }
        })
    },
    [actions.setEnterSearchMode]: (state) => {
        return Object.assign({}, state, {
            isSearchMode: true
        })
    },
    [actions.leaveSearchMode]: (state) => {
        return Object.assign({}, state, {
            isSearchMode: false
        })
    },
    [actions.setEnterCommentMode]: (state) => {
        return Object.assign({}, state, {
            isCommentMode: true
        })
    },
    [actions.leaveCommentMode]: (state) => {
        return Object.assign({}, state, {
            isCommentMode: false
        })
    }
}, initialState)


