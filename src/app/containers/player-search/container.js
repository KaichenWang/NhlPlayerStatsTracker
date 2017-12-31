import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './actions'
import * as appActions from '../app/actions'
import { DebounceInput } from 'react-debounce-input'

class PlayerSearch extends React.Component {
    render() {
        const {
            results
        } = this.props.playerSearch

        const {
            onSearchInputChange,
            addPlayer
        } = this.props

        const onChange = (e) => {
            e.persist()
            onSearchInputChange(e.target.value)
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
                            <li key={result.id} onClick={() => addPlayer(results[result.id])}>
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
        playerSearch: state.playerSearch
    }
}

const mapDispatchToProps = {
    onSearchInputChange: actions.onSearchInputChange,
    addPlayer: appActions.addPlayer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSearch)
