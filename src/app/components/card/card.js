import React from 'react'
import PropTypes from 'prop-types'

const componentClass = 'c-card'

const Card = ({ player, stats, removePlayer }) => (
    <div className={ componentClass } style={{border: '1px solid black'}}>
        <button onClick={() => removePlayer(player.id)}>Remove</button>
        <img src={'https://nhl.bamcontent.com/images/headshots/current/168x168/' + player.id +'.jpg'}/>
        <h2>{player.firstName + ' ' + player.lastName}</h2>

            {!!stats ?
                <table className={ componentClass + '--table' }>
                    <thead>
                    <tr>
                        {Object.keys(stats).map(function (key) {
                            const stat = stats[key]
                            return (
                                <th key={key}>
                                    {key}
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
                <h2>
                    Loading stats...
                </h2>
            }
    </div>
)

Card.propTypes = {
    player: PropTypes.object,
    stats: PropTypes.object,
    removePlayer: PropTypes.func
}

export default Card