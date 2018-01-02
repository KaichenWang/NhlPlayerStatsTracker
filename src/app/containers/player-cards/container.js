import React from 'react'
import {connect} from 'react-redux'
import * as appActions from '../app/actions'

import Card from '../../components/card/card'

import { parseQueryToArray } from '../../utils'

class PlayerCards extends React.Component {
    render() {
        const {
            players,
            stats
        } = this.props.app

        const {
            query
        } = this.props.router

        const {
            removePlayer,
            removeAllPlayers
        } = this.props

        const queryPlayers = !!query.players && query.players.length > 0 ? parseQueryToArray(query.players) : []

        return (
            <div>
                {Object.keys(players).length > 0 &&
                    <div className={'player-cards__action'}>
                        <button className={'btn btn-primary btn-sm'} onClick={() => removeAllPlayers()}>Remove all</button>
                    </div>
                }

                {queryPlayers.map(function (key) {
                        const player = players[key]
                        return (
                            player &&
                            <Card
                                key={player.id}
                                player={player}
                                stats={stats[player.id]}
                                removePlayer={removePlayer}
                            />
                        )
                    })
                }

                {Object.keys(players).length > 0 &&
                    <div className={'player-cards__action'}>
                        <button className={'btn btn-primary btn-sm'} onClick={() => removeAllPlayers()}>Remove all</button>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        router: state.router
    }
}

const mapDispatchToProps = {
    removePlayer: appActions.removePlayer,
    removeAllPlayers: appActions.removeAllPlayers
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCards)
