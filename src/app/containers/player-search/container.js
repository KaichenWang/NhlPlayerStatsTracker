import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './actions'
import * as appActions from '../app/actions'
import { DebounceInput } from 'react-debounce-input'
import { MAX_PLAYERS } from '../../constants'

class PlayerSearch extends React.Component {
    componentDidMount() {
        this.input.focus()
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.playerSearch.isSearchFocus && this.props.playerSearch.isSearchFocus) {
            this.input.focus()
        }
    }

    render() {
        const {
            players,
            stats
        } = this.props.app

        const {
            query,
            results,
            isResultsLoading
        } = this.props.playerSearch

        const {
            onSearchInputChange,
            setQuery,
            setFocus,
            addPlayer,
            addStats,
            removePlayer,
            addNewPlayer,
            removeNewPlayer
        } = this.props

        const onChange = (e) => {
            e.persist()
            const val = e.target.value
            onSearchInputChange(val)
            setQuery(val)
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

        const onClear = () => {
            const input = this.input
            onSearchInputChange('')
            setQuery('')
            input.focus()
        }

        return (
            <div className={'search'}>
                <form onSubmit={e => { e.preventDefault(); }} autoComplete="off" className="search__form">
                    <DebounceInput
                        type="text"
                        debounceTimeout={500}
                        placeholder="Search by player name"
                        name="search"
                        value={query}
                        autoComplete="off"
                        className={'search__input form-control'}
                        onChange={onChange}
                        inputRef={(input) => this.input = input}
                        onBlur={() => setFocus(false)}
                        aria-label="Search by player name"/>
                    {query !== '' &&
                        <i className="ti-close search__clear" title="Clear search" onClick={onClear}></i>
                    }
                </form>
                <ul className={'search__result-group list-group'}>
                    {!isResultsLoading && Object.keys(results).map(function (key) {
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
                                        <i className={'search__check ti-heart animated bounceIn'} title="Remove player"></i>
                                        :
                                        <i className={'search__plus ti-heart'} title="Add player"></i>
                                }
                            </li>
                        )
                    })}
                    {isResultsLoading &&
                        <div className="c-loader mt-3"></div>
                    }
                    {query !== '' && Object.keys(results).length === 0 && !isResultsLoading &&
                        <li className={'search__result-item--empty text-center mt-3 mb-3'}>No Results</li>
                    }
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
    setQuery: actions.setQuery,
    setFocus: actions.setFocus,
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
