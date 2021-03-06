import React from 'react'
import {connect} from 'react-redux'
import * as appActions from '../app/actions'

import Card from '../../components/card/card'

import { parseQueryToArray } from '../../utils'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import classNames from 'classnames'

import { MAX_PLAYERS } from '../../constants'

class PlayerCards extends React.Component {
    render() {
        const {
            players,
            stats,
            playerImages,
            isFullscreenMode,
            isSearchMode
        } = this.props.app

        const {
            query
        } = this.props.router

        const {
            enterSearchMode,
            removePlayer,
            addPlayerImg
        } = this.props

        const queryPlayers = !!query.players && query.players.length > 0 ? parseQueryToArray(query.players) : []

        const onImgLoad = (playerId) => {
            addPlayerImg(playerId)
        }

        return (
            <div className={'player-cards ' + classNames(
                    {'player-cards__active': Object.keys(players).length > 0})}>

                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: 'zoomIn',
                        leave: 'zoomOut'
                    }}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={200}
                    className="row player-cards__row"
                >
                    {queryPlayers.map(function (key) {
                            const count = queryPlayers.length
                            const player = players[key]

                            if (count % 3 === 0 || count % 2 !== 0 && count > 3) {
                                return (
                                    player &&
                                    <div key={player.id} className="col-sm-12 col-md-6 col-lg-4 player-cards__box animated">
                                        <Card
                                            key={player.id}
                                            player={player}
                                            stats={stats[player.id]}
                                            removePlayer={removePlayer}
                                            onImgLoad={onImgLoad}
                                            isImgLoaded={playerImages.indexOf(player.id) !== -1}
                                            isFullscreenMode={isFullscreenMode}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                        />
                                    </div>

                                )
                            }
                            else if (count % 2 === 0) {
                                return (
                                    player &&
                                    <div key={player.id} className="col-sm-12 col-md-6 player-cards__box animated">
                                        <Card
                                            key={player.id}
                                            player={player}
                                            stats={stats[player.id]}
                                            removePlayer={removePlayer}
                                            onImgLoad={onImgLoad}
                                            isImgLoaded={playerImages.indexOf(player.id) !== -1}
                                            isFullscreenMode={isFullscreenMode}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                        />
                                    </div>
                                )
                            }
                            else if (count === 1) {
                                return (
                                    player &&
                                    <div key={player.id} className="col-sm-12 player-cards__box animated">
                                        <Card
                                            key={player.id}
                                            player={player}
                                            stats={stats[player.id]}
                                            removePlayer={removePlayer}
                                            onImgLoad={onImgLoad}
                                            isImgLoaded={playerImages.indexOf(player.id) !== -1}
                                            isFullscreenMode={isFullscreenMode}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </ReactCSSTransitionGroup>
                {!Object.keys(queryPlayers).length && !isSearchMode &&
                    <div className="player-cards__add">
                        <div className="player-cards__add-inner" onClick={enterSearchMode}>
                            <i className="player-cards__add-icon ti-plus"></i>
                            <h5 className="player-cards__add-label mt-3">Add Player</h5>
                        </div>
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
    removeAllPlayers: appActions.removeAllPlayers,
    enterSearchMode: appActions.enterSearchMode,
    leaveSearchMode: appActions.leaveSearchMode,
    leaveCommentMode: appActions.leaveCommentMode,
    addPlayerImg: appActions.addPlayerImg
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCards)
