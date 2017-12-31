import {createAction} from 'redux-act'
import fetch from 'cross-fetch'

export const addPlayer = createAction('Add player')
export const removePlayer = createAction('Remove player')
