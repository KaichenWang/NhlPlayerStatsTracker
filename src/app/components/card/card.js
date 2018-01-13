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
                    showStatus={false}>
                {!!stats && stats.slice(0).reverse().map((season, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <span>{season.team.name}</span>
                            </div>
                            <table className={ componentClass + '__data table' }>
                            <thead>
                            <tr>
                            {Object.keys(season.stat).map(function (key) {
                                const stat = season.stat[key]
                                return (
                                    <th key={key}>
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}
                                    </th>
                                )
                            })}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            {Object.keys(season.stat).map(function (key) {
                                const stat = season.stat[key]
                                return (
                                    <td key={key}>
                                        {stat}
                                    </td>
                                )
                            })}
                            </tr>
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