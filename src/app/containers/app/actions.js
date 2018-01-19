import {createAction} from 'redux-act'
import fetch from 'cross-fetch'
import { push } from 'redux-little-router';
import { MAX_PLAYERS, MESSAGE_MAX_PLAYER } from '../../constants'

import { parseArrayToQuery } from '../../utils'

import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const setPlayer = createAction('Add player')
export const unsetPlayer = createAction('Remove player')
export const unsetAllPlayers = createAction('Remove all players')
export const setStats = createAction('Set stats')
export const flagAsRemoved = createAction('Flag player as removed')
export const setEnterSearchMode = createAction('Enter search mode')
export const leaveSearchMode = createAction('Leave search mode')
export const setEnterCommentMode = createAction('Leave comment mode')
export const leaveCommentMode = createAction('Leave comment mode')
export const clearNewPlayers = createAction('Clear new players')
export const addNewPlayer = createAction('Add new player')
export const removeNewPlayer = createAction('Remove new players')
export const addPlayerImg = createAction('Add player image')
export const setModalOpen = createAction('Set modal open')
export const setModalContent = createAction('Set modal content')
export const setFullscreenMode = createAction('Set fullscreen mode')


export function addPlayer(playerId) {
    return (dispatch, state) => {
        if (Object.keys(state().app.players).length < MAX_PLAYERS) {
            dispatch(setPlayer(playerId))
            const queryPlayers = parseArrayToQuery(Object.keys(state().app.players))
            dispatch(push({
                query: {
                    players: queryPlayers
                }
            }))
            cookies.set('path', queryPlayers)
        }
        else {
            dispatch(setModalContent({
                content: MESSAGE_MAX_PLAYER
            }))
            dispatch(setModalOpen(true))
        }
    }
}

export function removePlayer(playerId) {
    return (dispatch, state) => {

        dispatch(flagAsRemoved)
        dispatch(unsetPlayer(playerId))
        const hasPlayers = Object.keys(state().app.players).length > 0
        const queryPlayers = parseArrayToQuery(Object.keys(state().app.players))
        const players = hasPlayers ? queryPlayers : undefined
        dispatch(push({
            query: {
                players
            }
        }))
        if (hasPlayers) {
            cookies.set('path', queryPlayers)
        }
        else {
            cookies.remove('path')
            dispatch(setFullscreenMode(false))
            dispatch(setEnterSearchMode())
            dispatch(leaveCommentMode())
        }
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
        cookies.remove('path')
        dispatch(setFullscreenMode(false))
        dispatch(setEnterSearchMode())
        dispatch(leaveCommentMode())
    }
}

export function addStats(playerId) {
    return (dispatch) => {
        fetch('https://statsapi.web.nhl.com/api/v1/people/' + playerId + '?expand=person.stats&stats=yearByYear&site=en_nhlCA')
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
                    team: data.nationality,
                    pos: data.primaryPosition.code
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