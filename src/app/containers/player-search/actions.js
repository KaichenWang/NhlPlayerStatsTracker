import {createAction} from 'redux-act'
import fetch from 'cross-fetch'

export const setQuery = createAction('Set search query')
export const setResults = createAction('Set search results')
export const setLoading = createAction('Set search results loading')

export function onSearchInputChange(value) {
    return (dispatch) => {
        dispatch(setLoading(true))
        return fetch('/search?value=' + value)
            .then(
                response => response.json(),
                // Do not use catch, because that will also catch
                // any errors in the dispatch and resulting render,
                // causing a loop of 'Unexpected batch number' errors.
                // https://github.com/facebook/react/issues/6895
                error => console.log('An error occurred.', error)
            )
            .then(json => {
                    dispatch(setResults(json))
                    dispatch(setLoading(false))
                }
            )
    }
}