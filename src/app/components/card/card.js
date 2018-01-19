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
                <Carousel
                    infiniteLoop
                    emulateTouch
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}>
                {!!stats && stats.slice(0).reverse().map((season, i) => {
                    return (
                        <div key={i}>
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
                                                <td>{!season.stat.games ?  '-' : season.stat.games}</td>
                                                <td>{!season.stat.goals ?  '-' : season.stat.goals}</td>
                                                <td>{!season.stat.assists ?  '-' : season.stat.assists}</td>
                                                <td>{!season.stat.points ?  '-' : season.stat.points}</td>
                                                <td>{!season.stat.plusMinus ?  '-' : season.stat.plusMinus}</td>
                                            </tr>
                                        :

                                        <tr>
                                            <td>{!season.stat.games ?  '-' : season.stat.games}</td>
                                            <td>{!season.stat.wins ?  '-' : season.stat.wins + '-' + season.stat.losses + '-' + season.stat.ot}</td>
                                            <td>{!season.stat.savePercentage ?  '-' : season.stat.savePercentage}</td>
                                            <td>{!season.stat.goalAgainstAverage ?  '-' : season.stat.goalAgainstAverage}</td>
                                            <td>{!season.stat.shutouts ?  '-' : season.stat.shutouts}</td>
                                        </tr>
                                    }
                                </tbody>
                                </table>
                            </div>
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
    isImgLoaded: PropTypes.bool,
    onClick: PropTypes.func,
    isFullscreenMode: PropTypes.bool
}

export default Card