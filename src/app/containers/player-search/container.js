import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './actions'
import * as appActions from '../app/actions'
import { DebounceInput } from 'react-debounce-input'

class PlayerSearch extends React.Component {
    render() {
        const {
            stats
        } = this.props.app

        const {
            results
        } = this.props.playerSearch

        const {
            onSearchInputChange,
            addPlayer,
            addStats
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
            <div>
                <form>
                    <DebounceInput
                        type="text"
                        debounceTimeout={500}
                        placeholder="Search player"
                        name="search"
                        onChange={onChange} />
                </form>
                <ul>
                    {Object.keys(results).map(function (key) {
                        const result = results[key]
                        return (
                            <li key={result.id} onClick={() => onResultClick(result.id)}>
                                <span>{result.firstName} </span>
                                <span>{result.lastName} </span>
                                <span>({result.team}) </span>
                                <span>- {result.id}</span>
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
    addStats: appActions.addStats
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearch)
