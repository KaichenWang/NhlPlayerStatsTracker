import React from 'react'
import {connect} from 'react-redux'
import * as appActions from '../app/actions'
import * as searchActions from '../player-search/actions'

class MenuBar extends React.Component {
    render() {
        const {
            isSearchMode,
            isCommentMode,
            newPlayers
        } = this.props.app

        const {
            enterSearchMode,
            enterCommentMode,
            enterPlayerMode,
            clearNewPlayers,
            onSearchInputChange,
            setQuery,
            setSearchFocus
        } = this.props

        const classNameSearch = isSearchMode ? 'menu-bar__item--active' : ''
        const classNameComment = isCommentMode ? 'menu-bar__item--active' : ''
        const classNamePlayer = !isSearchMode &&  !isCommentMode ? 'menu-bar__item--active' : ''

        return (
            <div className="menu-bar animated">
                <div className={'menu-bar__item ' + classNameSearch} onClick={() => {
                    enterSearchMode()
                    onSearchInputChange('')
                    setQuery('')
                    setSearchFocus(true)
                }}>
                    <i className="ti-search menu-bar__icon"></i>
                    <span className="menu-bar__label">Find Players</span>
                </div>
                <div className={'menu-bar__item ' + classNamePlayer} onClick={() => {
                    clearNewPlayers()
                    enterPlayerMode()
                }}>
                    <div className={'menu-bar__icon-container'}>
                        <i className="ti-heart menu-bar__icon"></i>
                        {newPlayers.length > 0 &&
                            <span className="menu-bar__notification animated bounceIn">{newPlayers.length}</span>
                        }
                    </div>
                    <span className="menu-bar__label">My Players</span>
                </div>               
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
    enterSearchMode: appActions.enterSearchMode,
    enterCommentMode: appActions.enterCommentMode,
    enterPlayerMode: appActions.enterPlayerMode,
    clearNewPlayers: appActions.clearNewPlayers,
    onSearchInputChange: searchActions.onSearchInputChange,
    setQuery: searchActions.setQuery,
    setSearchFocus: searchActions.setFocus
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar)
