import {createAction} from 'redux-act'
import fetch from 'cross-fetch'

export const addPlayer = createAction('Add player')
export const removePlayer = createAction('Remove player')
export const setStats = createAction('Set stats')

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
