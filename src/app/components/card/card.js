import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const componentClass = 'c-card'

import { Carousel } from 'react-responsive-carousel';

const Card = ({ player, stats, removePlayer, onImgLoad, isImgLoaded, onClick, isFullscreenMode}) => (
    <div className={ componentClass }>
        <div className={ componentClass + '__background'}
             style={{'background-image': 'url("https://nhl.bamcontent.com/images/actionshots/' + player.id + '.jpg")'}}>
        </div>
        <div className={ componentClass + '__inner'} onClick={onClick}>
            <i className={componentClass + '__remove ti-close ' +
                classNames(
                    {'c-card__remove-faded': isFullscreenMode}
                )} onClick={() => removePlayer(player.id)}>
            </i>
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
                            src={'https://nhl.bamcontent.com/images/headshots/current/168x168/' + player.id + '.png'}/>
                        {!isImgLoaded &&
                            <div className={componentClass + '__initials'}>{player.firstName.charAt(0)+player.lastName.charAt(0)}</div>
                        }
                    </div>
                <div className={componentClass + '__name-container'}>
                    <h5 className={ componentClass + '__name mt-2' }>{player.firstName + ' ' + player.lastName}</h5>
                </div>
            </div>
            <div className={ componentClass + '__stats' }>
                {!!stats && stats.length > 1 &&
                    <Carousel
                        infiniteLoop
                        emulateTouch
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}>
                        {stats.slice(0).reverse().map((season, i) => {
                            return (
                                <div key={i} className={ componentClass + '__data-wrapper'}>
                                    <div className={ componentClass + '__data-title'}>
                                        <span>{season.team.name}</span>
                                    </div>
                                    <div className={ componentClass + '__data-container'}>
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
                                                    <th>Sv%</th>
                                                    <th>GAA</th>
                                                    <th>Record</th>
                                                    <th>SO</th>
                                                </tr>
                                            }
                                            </thead>
                                            <tbody>
                                            {player.pos !== 'G' ?
                                                <tr>
                                                    <td>{typeof season.stat.games === 'undefined' ? '-' : season.stat.games}</td>
                                                    <td>{typeof season.stat.goals === 'undefined' ? '-' : season.stat.goals}</td>
                                                    <td>{typeof season.stat.assists === 'undefined' ? '-' : season.stat.assists}</td>
                                                    <td>{typeof season.stat.points === 'undefined' ? '-' : season.stat.points}</td>
                                                    <td>{typeof season.stat.plusMinus === 'undefined' ? '-' : season.stat.plusMinus}</td>
                                                </tr>
                                                :
                                                <tr>
                                                    <td>{typeof season.stat.games === 'undefined' ? '-' : season.stat.games}</td>
                                                    <td>{typeof season.stat.savePercentage === 'undefined' ? '-' : season.stat.savePercentage}</td>
                                                    <td>{typeof season.stat.goalAgainstAverage === 'undefined' ? '-' : season.stat.goalAgainstAverage}</td>
                                                    <td>{typeof season.stat.wins === 'undefined' ? '-' : season.stat.wins + '-' + season.stat.losses + '-' + season.stat.ot}</td>
                                                    <td>{typeof season.stat.shutouts === 'undefined' ? '-' : season.stat.shutouts}</td>
                                                </tr>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        })}
                    </Carousel>
                }
                {!!stats && stats.length === 1 &&
                    <div className={ componentClass + '__data-wrapper'}>
                        <div className={ componentClass + '__data-title'}>
                            <span>{stats[0].team.name}</span>
                        </div>
                        <div className={ componentClass + '__data-container'}>
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
                                        <th>Sv%</th>
                                        <th>GAA</th>
                                        <th>Record</th>
                                        <th>SO</th>
                                    </tr>
                                }
                                </thead>
                                <tbody>
                                {player.pos !== 'G' ?
                                    <tr>
                                        <td>{typeof stats[0].stat.games === 'undefined' ? '-' : stats[0].stat.games}</td>
                                        <td>{typeof stats[0].stat.goals === 'undefined' ? '-' : stats[0].stat.goals}</td>
                                        <td>{typeof stats[0].stat.assists === 'undefined' ? '-' : stats[0].stat.assists}</td>
                                        <td>{typeof stats[0].stat.points === 'undefined' ? '-' : stats[0].stat.points}</td>
                                        <td>{typeof stats[0].stat.plusMinus === 'undefined' ? '-' : stats[0].stat.plusMinus}</td>
                                    </tr>
                                    :
                                    <tr>
                                        <td>{typeof stats[0].stat.games === 'undefined' ? '-' : stats[0].stat.games}</td>
                                        <td>{typeof stats[0].stat.savePercentage === 'undefined' ? '-' : stats[0].stat.savePercentage}</td>
                                        <td>{typeof stats[0].stat.goalAgainstAverage === 'undefined' ? '-' : stats[0].stat.goalAgainstAverage}</td>
                                        <td>{typeof stats[0].stat.wins === 'undefined' ? '-' : stats[0].stat.wins + '-' + stats[0].stat.losses + '-' + stats[0].stat.ot}</td>
                                        <td>{typeof stats[0].stat.shutouts === 'undefined' ? '-' : stats[0].stat.shutouts}</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {!!stats && !Object.keys(stats).length &&
                    <div className={ componentClass + '__data-wrapper'}>
                        <div className={ componentClass + '__data-title'}>
                            <span>No stats available</span>
                        </div>
                        <div className={ componentClass + '__data-container'}>
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
                                        <th>Sv%</th>
                                        <th>GAA</th>
                                        <th>Record</th>
                                        <th>SO</th>
                                    </tr>
                                }
                                </thead>
                                <tbody>
                                {player.pos !== 'G' ?
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    :
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {!stats &&
                    <div className="c-loader p-4"></div>
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
    isImgLoaded: PropTypes.bool,
    onClick: PropTypes.func,
    isFullscreenMode: PropTypes.bool
}

export default Card