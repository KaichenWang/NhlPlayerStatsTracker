import React from 'react'
import PropTypes from 'prop-types'

const componentClass = 'c-card'

const Card = ({ player, stats, removePlayer }) => (
    <div className={ componentClass + ' col-lg-4 col-md-6 animated mb-4'}>
        <div className={ componentClass + '__inner'}>
            <div className={ componentClass + '__info' }>
                <img className={componentClass + '__image image'} src={'https://nhl.bamcontent.com/images/headshots/current/168x168/' + player.id +'.png'}/>
                <div className={componentClass + '__name-container'}>
                    <h5 className={ componentClass + '__name' }>{player.firstName + ' ' + player.lastName}</h5>
                    <button type="button" className={ componentClass + '__remove btn btn-link' } aria-label="Remove" onClick={() => removePlayer(player.id)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div className={ componentClass + '__stats' }>
                {!!stats ?
                    <table className={ componentClass + '__data table' }>
                        <thead>
                        <tr>
                            {Object.keys(stats).map(function (key) {
                                const stat = stats[key]
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
                            {Object.keys(stats).map(function (key) {
                                const stat = stats[key]
                                return (
                                    <td key={key}>
                                        {stat}
                                    </td>
                                )
                            })}
                        </tr>
                        </tbody>
                    </table>
                :
                    <div className="c-loader p-4"></div>
                }
            </div>
        </div>
    </div>
)

Card.propTypes = {
    player: PropTypes.object,
    stats: PropTypes.object,
    removePlayer: PropTypes.func
}

export default Card