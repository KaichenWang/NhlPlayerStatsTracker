import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const componentClass = 'c-card'

import { Carousel } from 'react-responsive-carousel';

const Card = ({ player, stats, removePlayer, onImgLoad, isImgLoaded }) => (
    <div className={ componentClass + ' col-lg-4 col-md-6 animated mb-4'}>
        <div className={ componentClass + '__inner'}>
            <div className={ componentClass + '__info' }>
                    <div className={componentClass + '__head'}>
                        <img
                            onLoad={() => onImgLoad(player.id)}
                            className={componentClass + '__image image ' +
                                classNames(
                                    {'image--loaded': isImgLoaded},
                                    {'image--error d-none': !isImgLoaded}
                                )
                            }
                            src={'https://nhl.bamcontent.com/images/headshots/current/168x168/' + player.id +'.png'}/>
                        {!isImgLoaded &&
                            <div className={componentClass + '__initials'}>{player.firstName.charAt(0)+player.lastName.charAt(0)}</div>
                        }
                    </div>
                <div className={componentClass + '__name-container'}>
                    <h5 className={ componentClass + '__name mt-2' }>{player.firstName + ' ' + player.lastName}</h5>
                    <i className={componentClass + '__remove ti-close'} onClick={() => removePlayer(player.id)}></i>
                </div>
            </div>
            <div className={ componentClass + '__stats' }>
                <Carousel
                    infiniteLoop
                    emulateTouch
                    showStatus={false}
                    showIndicators={false}>
                {!!stats && stats.slice(0).reverse().map((season, i) => {
                    return (
                        <div key={i}>
                            <div className={ componentClass + '__data-title'}>
                                <span>{season.team.name}</span>
                            </div>
                            <table className={ componentClass + '__data table' }>
                            <thead>
                                {player.pos !== 'G' ?
                                    <tr>
                                        <th>GP</th>
                                        <th>G</th>
                                        <th>A</th>
                                        <th>P</th>
                                        <th>+/-</th>
                                    </tr>
                                :
                                    <tr>
                                        <th>GP</th>
                                        <th>Record</th>
                                        <th>Sv%</th>
                                        <th>GAA</th>
                                        <th>SO</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {player.pos !== 'G' ?
                                        <tr>
                                            <th>{season.stat.games}</th>
                                            <th>{season.stat.goals}</th>
                                            <th>{season.stat.assists}</th>
                                            <th>{season.stat.points}</th>
                                            <th>{season.stat.plusMinus}</th>
                                        </tr>
                                    :

                                    <tr>
                                        <th>{season.stat.games}</th>
                                        <th>{season.stat.wins + '-' + season.stat.losses + '-' + season.stat.ot}</th>
                                        <th>{season.stat.savePercentage}</th>
                                        <th>{season.stat.goalAgainstAverage}</th>
                                        <th>{season.stat.shutouts}</th>
                                    </tr>
                                }
                            </tbody>
                            </table>
                        </div>
                    )
                })}
                </Carousel>

                {!stats &&
                    <div className="c-loader p-4"></div>
                }

                {!!stats && !Object.keys(stats).length &&
                    <span className={ componentClass + '__message d-block text-center mb-3'}>No Stats Available</span>
                }
            </div>
        </div>
    </div>
)

Card.propTypes = {
    player: PropTypes.object,
    stats: PropTypes.array,
    removePlayer: PropTypes.func,
    onImgLoad: PropTypes.func,
    isImgLoaded: PropTypes.bool
}

export default Card