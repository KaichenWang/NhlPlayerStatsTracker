import React from 'react'
import {connect} from 'react-redux'
import * as appActions from '../app/actions'

import Card from '../../components/card/card'

import { parseQueryToArray } from '../../utils'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { MAX_PLAYERS } from '../../constants'

class PlayerCards extends React.Component {
    render() {
        const {
            players,
            stats,
            isSearchMode,
            playerImages
        } = this.props.app

        const {
            query
        } = this.props.router

        const {
            removePlayer,
            enterSearchMode,
            leaveSearchMode,
            addPlayerImg
        } = this.props

        const queryPlayers = !!query.players && query.players.length > 0 ? parseQueryToArray(query.players) : []

        const onClickBg = (e) => {
            if (e.currentTarget === e.target) {
                leaveSearchMode()
            }
        }

        const onImgLoad = (playerId) => {
            addPlayerImg(playerId)
        }

        return (
            <div className="player-cards">
                {/*{Object.keys(players).length > 0 &&*/}
                    {/*<div className={'player-cards__action'}>*/}
                        {/*<button className={'btn btn-primary btn-sm'} onClick={() => removeAllPlayers()}>Remove all</button>*/}
                    {/*</div>*/}
                {/*}*/}

                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: 'zoomIn',
                        leave: 'zoomOut'
                    }}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={200}
                    className="row player-cards__row"
                    onClick={onClickBg}
                >
                    {queryPlayers.map(function (key) {
                            const player = players[key]
                            return (
                                player &&
                                <Card
                                    key={player.id}
                                    player={player}
                                    stats={stats[player.id]}
                                    removePlayer={removePlayer}
                                    onImgLoad={onImgLoad}
                                    isImgLoaded={playerImages.indexOf(player.id) !== -1}
                                />
                            )
                        })
                    }

                    {Object.keys(queryPlayers).length < MAX_PLAYERS && !isSearchMode &&
                        <div className="player-cards__add col-sm-12 pt-2 pb-2">
                            <div className="player-cards__add-inner" onClick={enterSearchMode}>
                                <i className="player-cards__add-icon ti-plus"></i>
                                <h5 className="player-cards__add-label mt-3">Add Player</h5>
                            </div>
                        </div>
                    }
                </ReactCSSTransitionGroup>

                {/*{Object.keys(players).length > 0 &&*/}
                    {/*<div className={'player-cards__action'}>*/}
                        {/*<button className={'btn btn-primary btn-sm'} onClick={() => removeAllPlayers()}>Remove all</button>*/}
                    {/*</div>*/}
                {/*}*/}
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
    removeAllPlayers: appActions.removeAllPlayers,
    enterSearchMode: appActions.enterSearchMode,
    leaveSearchMode: appActions.leaveSearchMode,
    addPlayerImg: appActions.addPlayerImg
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCards)
