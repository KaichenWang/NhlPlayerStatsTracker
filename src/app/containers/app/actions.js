import {createAction} from 'redux-act'
import fetch from 'cross-fetch'
import { push } from 'redux-little-router';
import { MAX_PLAYERS } from '../../constants'

import { parseArrayToQuery } from '../../utils'

export const setPlayer = createAction('Add player')
export const unsetPlayer = createAction('Remove player')
export const unsetAllPlayers = createAction('Remove all players')
export const setStats = createAction('Set stats')
export const flagAsRemoved = createAction('Flag player as removed')
export const setEnterSearchMode = createAction('Enter search mode')
export const leaveSearchMode = createAction('Leave search mode')
export const setEnterCommentMode = createAction('Leave comment mode')
export const leaveCommentMode = createAction('Leave comment mode')

export function addPlayer(playerId) {
    return (dispatch, state) => {
        if (Object.keys(state().app.players).length < MAX_PLAYERS) {
            dispatch(setPlayer(playerId))
            dispatch(push({
                query: {
                    players: parseArrayToQuery(Object.keys(state().app.players))
                }
            }))
        }
        else {
            alert('Max number of players is: ' + MAX_PLAYERS)
        }
    }
}

export function removePlayer(playerId) {
    return (dispatch, state) => {

        dispatch(flagAsRemoved)
        dispatch(unsetPlayer(playerId))
        const players = Object.keys(state().app.players).length > 0 ? parseArrayToQuery(Object.keys(state().app.players)) : undefined
        dispatch(push({
            query: {
                players
            }
        }))


    }
}

export function removeAllPlayers() {
    return (dispatch, state) => {
        dispatch(unsetAllPlayers())
        dispatch(push({
            query: {
                players: undefined
            }
        }))
    }
}

export function addStats(playerId) {
    return (dispatch) => {
        return fetch('https://statsapi.web.nhl.com/api/v1/people/' + playerId + '?expand=person.stats&stats=yearByYear&site=en_nhlCA')
            .then(
                response => response.json(),
                // Do not use catch, because that will also catch
                // any errors in the dispatch and resulting render,
                // causing a loop of 'Unexpected batch number' errors.
                // https://github.com/facebook/react/issues/6895
                error => console.log('An error occurred.', error)
            )
            .then(json => {
                    dispatch(setStats({
                        playerId,
                        data: json
                    }))
                }
            )
    }
}


export function onInitialLoad(queryPlayers) {
    return (dispatch) => {
        queryPlayers.map((value) => {
            fetch('https://statsapi.web.nhl.com/api/v1/people/' + value + '?expand=person.stats&stats=yearByYear&site=en_nhlCA')
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => {
                const data = json.people[0]
                const player = {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    team: data.nationality
                }
                dispatch(setPlayer(player))
                dispatch(setStats({
                    playerId: player.id,
                    data: json
                }))
            })
        })
    }
}

export function enterSearchMode() {
    return (dispatch) => {
        dispatch(leaveCommentMode())
        dispatch(setEnterSearchMode())
    }
}

export function enterCommentMode() {
    return (dispatch) => {
        dispatch(leaveSearchMode())
        dispatch(setEnterCommentMode())
    }
}

export function enterPlayerMode() {
    return (dispatch) => {
        dispatch(leaveSearchMode())
        dispatch(leaveCommentMode())
    }
}