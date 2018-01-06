import React from 'react'
import PlayerSearch from '../player-search/container'
import PlayerCards from '../player-cards/container'

// Components

const App = () => (
    <div className="main">
        <div className="page-title-container">
            <h1 className={'h2'}>NHL Player Stats Tracker</h1>
        </div>
        <PlayerSearch/>
        <PlayerCards/>
    </div>
)

export default App