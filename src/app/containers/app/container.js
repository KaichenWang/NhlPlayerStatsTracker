import React from 'react'
import { connect } from 'react-redux'
import PlayerSearch from '../player-search/container'
import PlayerCards from '../player-cards/container'
import MenuBar from '../menu-bar/container'
import Modal from 'react-responsive-modal'
import * as actions from './actions'
import AdSense from 'react-adsense'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
    render() {
        const {
            players,
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
        const classNameContent = isCommentMode || isSearchMode ?'sidebar--closed' : 'sidebar--open'

        return (
            <div className={'app'}>
                <div className="app__main">

                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: 'app__sidebar-inner--open',
                            leave: 'app__sidebar-inner--closed'
                        }}
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                        className={'app__sidebar ' + classNameSearch}
                    >
                        {isSearchMode &&
                            <div className="app__sidebar-inner">
                                <PlayerSearch/>
                            </div>
                        }
                    </ReactCSSTransitionGroup>

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
                            {Object.keys(players).length > 0 &&
                                (!isFullscreenMode ?
                                    <i className="ti-arrows-corner app_icon-fullscreen" title="Enter fullscreen"></i>
                                :
                                    <i className="ti-layout-media-overlay-alt app_icon-fullscreen" title="Exit fullscreen"></i>
                                )
                            }
                        </div>
                        <PlayerCards/>
                    </div>
                    <div className={'app__sidebar ' + classNameComment}>
                        <div className="app__sidebar-inner app__right">
                            <div className="app__comments">
                                <div className="fb-comments" data-href="http://www.pksubbantracker.com/" colorscheme="dark" data-width="100%" data-numposts="10" data-order-by="reverse_time"></div>
                            </div>
                            <div className="app__ad">
                                <AdSense.Google client="ca-pub-9744931817553487"
                                                slot="5318883280"
                                                layout="in-article"
                                                style={{
                                                    display:'block',
                                                    'text-align': 'center'
                                                }}
                                                format="fluid" />
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
                    {!isFullscreenMode &&
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
