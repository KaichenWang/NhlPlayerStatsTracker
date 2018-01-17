import React from 'react'
import { connect } from 'react-redux'
import PlayerSearch from '../player-search/container'
import PlayerCards from '../player-cards/container'
import MenuBar from '../menu-bar/container'
import Modal from 'react-responsive-modal'
import * as actions from './actions'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
    render() {
        const {
            isSearchMode,
            isCommentMode,
            isModalOpen,
            modalContent,
            isFullscreenMode
        } = this.props.app

        const {
            setModalOpen,
            setFullscreenMode,
            leaveSearchMode,
            leaveCommentMode
        } = this.props

        const classNameSearch = isSearchMode ? 'sidebar--open' : 'sidebar--closed'
        const classNameComment = isCommentMode ? 'sidebar--open' : 'sidebar--closed'
        const classNameContent = isCommentMode || isSearchMode ? 'sidebar--open' : 'sidebar--closed'

        return (
            <div className={'app'}>
                <div className="app__main">
                    <div className={'app__sidebar ' + classNameSearch}>
                        <div className="app__sidebar-inner">
                            <PlayerSearch/>
                        </div>
                    </div>
                    <div className={'app__content ' + classNameContent}>
                        <div className="app__fullscreen" onClick={() => {
                            if(isFullscreenMode) {
                                setFullscreenMode(false)
                            }
                            else {
                                setFullscreenMode(true)
                                leaveSearchMode()
                                leaveCommentMode()
                            }
                        }}>
                            {!isFullscreenMode ?
                                <i className="ti-arrows-corner" title="Enter fullscreen"></i>
                                :
                                <i className="ti-layout-media-overlay-alt" title="Exit fullscreen"></i>
                            }
                        </div>
                        <PlayerCards/>
                    </div>
                    <div className={'app__sidebar ' + classNameComment}>
                        <div className="app__sidebar-inner">
                            <div className="comments">
                                <div className="fb-comments" data-href="http://www.pksubbantracker.com/" data-width="100%" data-numposts="10" data-order-by="reverse_time"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactCSSTransitionGroup
                    transitionName={{
                        enter: 'zoomIn',
                        leave: 'zoomOut'
                    }}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={200}
                    className="app__bottom"
                >
                    {!isFullscreenMode&&
                        <MenuBar/>
                    }
                </ReactCSSTransitionGroup>

                <Modal open={isModalOpen} onClose={() => {setModalOpen(false)}} little>
                    <div className="mt-5 mb-2">{modalContent.content}</div>
                </Modal>
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
    setModalOpen: actions.setModalOpen,
    setFullscreenMode: actions.setFullscreenMode,
    leaveSearchMode: actions.leaveSearchMode,
    leaveCommentMode: actions.leaveCommentMode
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
