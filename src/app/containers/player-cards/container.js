import React from 'react'
import {connect} from 'react-redux'
import * as appActions from '../app/actions'

import Card from '../../components/card/card'

class PlayerCards extends React.Component {
    render() {
        const {
            players
        } = this.props.app

        const {
            removePlayer
        } = this.props

        return (
            <div>
                {Object.keys(players).map(function (key) {
                    const player = players[key]
                    return (
                        <Card
                            key={player.id}
                            player={player}
                            removePlayer={removePlayer}
                        />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = {
    removePlayer: appActions.removePlayer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCards)
