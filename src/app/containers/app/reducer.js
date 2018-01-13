import {createReducer} from 'redux-act'
import * as actions from './actions'
import {  } from 'redux-little-router';
import { TEAMS } from '../../constants';

const initialState = {
    players: {},
    stats: {},
    isSearchMode : false,
    isCommentMode: false,
    newPlayers: [],
    playerImages: [],
    teams: TEAMS,
    isModalOpen: false,
    modalContent: {}
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
        let stats = {}
        const allStats = payload.data.people[0].stats[0].splits
        const currentSeason = allStats.filter((obj) => {
            return obj.season === '20172018'
        });
        stats[payload.playerId] = currentSeason

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
    },
    [actions.clearNewPlayers]: (state) => {
        return Object.assign({}, state, {
            newPlayers: []
        })
    },
    [actions.addNewPlayer]: (state, playerId) => {
        return Object.assign({}, state, {
            newPlayers: [
                ...state.newPlayers,
                playerId
            ]
        })
    },
    [actions.removeNewPlayer]: (state, playerId) => {
        const i = state.newPlayers.indexOf(playerId)
        let newPlayers = [...state.newPlayers]
        newPlayers = newPlayers.filter(item => item !== playerId)
        return Object.assign({}, state, {
            newPlayers
        })
    },
    [actions.addPlayerImg]: (state, playerId) => {
        const playerImages = [
            ...state.playerImages,
            playerId
        ]
        return Object.assign({}, state, {
            playerImages
        })
    },
    [actions.setModalOpen]: (state, shouldOpen) => {
        return Object.assign({}, state, {
            isModalOpen: shouldOpen
        })
    },
    [actions.setModalContent]: (state, modalContent) => {
        return Object.assign({}, state, {
            modalContent
        })
    }
}, initialState)


