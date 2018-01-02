import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './actions'
import * as appActions from '../app/actions'
import { DebounceInput } from 'react-debounce-input'

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
            removePlayer
        } = this.props

        const onChange = (e) => {
            e.persist()
            onSearchInputChange(e.target.value)
        }

        const onResultClick = (resultId) => {
            addPlayer(results[resultId])
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
                {Object.keys(results).length > 0 &&
                    <ul className={'search__result-group list-group'}>
                        {Object.keys(results).map(function (key) {
                            const result = results[key]
                            return (
                                <li className={'search__result-item'} key={result.id}>
                                    <span className={'search__result-info'}>
                                        <span> {result.firstName} </span>
                                        <span>{result.lastName} </span>
                                        <span>({result.team}) </span>
                                    </span>
                                    {
                                        players[result.id] ?
                                            <button className={'search__result-btn btn btn-danger btn-sm'} onClick={() => removePlayer(result.id)}>Remove</button>
                                            :
                                            <button className={'search__result-btn btn btn-success btn-sm'} onClick={() => onResultClick(result.id)}>Add</button>
                                    }
                                </li>
                            )
                        })}
                    </ul>
                }
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
    removePlayer: appActions.removePlayer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearch)
