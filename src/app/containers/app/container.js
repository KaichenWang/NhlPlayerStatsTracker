import React from 'react'
import { connect } from 'react-redux'
import PlayerSearch from '../player-search/container'
import PlayerCards from '../player-cards/container'
import MenuBar from '../menu-bar/container'

class App extends React.Component {
    render() {
        const {
            isSearchMode,
            isCommentMode
        } = this.props.app

        const {
        } = this.props

        const classNameSearch = isSearchMode ? 'sidebar--open' : 'sidebar--closed'
        const classNameComment = isCommentMode ? 'sidebar--open' : 'sidebar--closed'
        const classNameContent = isCommentMode || isSearchMode ? 'sidebar--open' : 'sidebar--closed'

        return (
            <div className={'app'}>
                <div className={'app__sidebar ' + classNameSearch}>
                    <PlayerSearch/>
                </div>
                <div className={'app__content ' + classNameContent}>
                    <PlayerCards/>
                </div>
                <div className={'app__sidebar ' + classNameComment}>
                    <div className="fb-comments" data-href="https://www.nhltracker.com/" data-width="100%" data-numposts="10"></div>
                </div>
                <MenuBar/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
