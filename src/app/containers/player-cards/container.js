import React from 'react'
import {connect} from 'react-redux'
import * as appActions from '../app/actions'

import Card from '../../components/card/card'

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
            removePlayer
        } = this.props

        return (
            <div>
                {!!query.player && query.player.length > 0 && !Array.isArray(query.player) &&
                    <Card
                        key={players[query.player].id}
                        player={players[query.player]}
                        stats={stats[players[query.player].id]}
                        removePlayer={removePlayer}
                    />
                }
                {!!query.player && query.player.length > 0 && Array.isArray(query.player) &&
                    query.player.map(function (key) {
                        const player = players[key]
                        return (
                            <Card
                                key={player.id}
                                player={player}
                                stats={stats[player.id]}
                                removePlayer={removePlayer}
                            />
                        )
                    })
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
    removePlayer: appActions.removePlayer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCards)
