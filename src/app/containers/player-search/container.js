import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './actions'
import * as appActions from '../app/actions'
import { DebounceInput } from 'react-debounce-input'
import { MAX_PLAYERS } from '../../constants'

class PlayerSearch extends React.Component {
    render() {
        const {
            players,
            stats
        } = this.props.app

        const {
            results
        } = this.props.playerSearch

        const {
            onSearchInputChange,
            addPlayer,
            addStats,
            removePlayer,
            addNewPlayer,
            removeNewPlayer
        } = this.props

        const onChange = (e) => {
            e.persist()
            onSearchInputChange(e.target.value)
        }

        const onResultClick = (resultId) => {
            addPlayer(results[resultId])
            if (Object.keys(players).length < MAX_PLAYERS) {
                addNewPlayer(resultId)
            }
            if (!stats[resultId]){
                addStats(resultId)
            }
        }

        return (
            <div className={'search'}>
                <form onSubmit={e => { e.preventDefault(); }} autoComplete="off">
                    <DebounceInput
                        type="text"
                        debounceTimeout={500}
                        placeholder="Enter NHL player name"
                        name="search"
                        autoComplete="false"
                        className={'search__input form-control'}
                        onChange={onChange} />
                </form>
                <ul className={'search__result-group list-group'}>
                    {Object.keys(results).map(function (key) {
                        const result = results[key]
                        return (
                            <li className={'search__result-item'} key={result.id} onClick={() => {
                                if (players[result.id]) {
                                    removePlayer(result.id)
                                    removeNewPlayer(result.id)
                                }
                                else {
                                    onResultClick(result.id)
                                }
                            }}>
                                <span className={players[result.id] ?
                                    'search__result-info search__result-info--added'
                                :
                                    'search__result-info'
                                }>
                                    <span> {result.firstName} </span>
                                    <span>{result.lastName} </span>
                                    <span>({result.team}) </span>
                                </span>
                                {
                                    players[result.id] ?
                                        <i className={'search__check ti-minus'}></i>
                                        :
                                        <i className={'search__plus ti-plus'}></i>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

PlayerSearch.propTypes = {
    playerSearch: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        playerSearch: state.playerSearch
    }
}

const mapDispatchToProps = {
    onSearchInputChange: actions.onSearchInputChange,
    addPlayer: appActions.addPlayer,
    addStats: appActions.addStats,
    removePlayer: appActions.removePlayer,
    addNewPlayer: appActions.addNewPlayer,
    removeNewPlayer: appActions.removeNewPlayer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearch)
