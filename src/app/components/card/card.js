import React from 'react'
import PropTypes from 'prop-types'

const componentClass = 'c-card'

const Card = ({ player, removePlayer }) => (
    <div className={ componentClass } style={{border: '1px solid black'}}>
        <button onClick={() => removePlayer(player.id)}>Remove</button>
        <h2>{player.firstName + ' ' + player.lastName}</h2>
        <table className={ componentClass + '--table' }>
            <thead>
                <tr>
                    <th>GP</th>
                    <th>G</th>
                    <th>A</th>
                    <th>P</th>
                    <th>+/-</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
)

Card.propTypes = {
    player: PropTypes.object,
    removePlayer: PropTypes.func
}

export default Card