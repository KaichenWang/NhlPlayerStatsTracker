import React from 'react'
import PlayerSearch from '../player-search/container'
import PlayerCards from '../player-cards/container'

// Components

const App = () => (
    <div>
        <h1>NHL Player Stats Tracker</h1>
        <PlayerSearch/>
        <PlayerCards/>
    </div>
)

export default App