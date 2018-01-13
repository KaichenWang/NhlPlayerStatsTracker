import React from 'react'
import { connect } from 'react-redux'
import PlayerSearch from '../player-search/container'
import PlayerCards from '../player-cards/container'
import MenuBar from '../menu-bar/container'
import Modal from 'react-responsive-modal'
import * as actions from './actions'

class App extends React.Component {
    render() {
        const {
            isSearchMode,
            isCommentMode,
            isModalOpen,
            modalContent
        } = this.props.app

        const {
            setModalOpen
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
                        <div className="app__content-inner">
                            <PlayerCards/>
                        </div>
                    </div>
                    <div className={'app__sidebar ' + classNameComment}>
                        <div className="app__sidebar-inner">
                            <div className="comments">
                                <div className="fb-comments" data-href="http://www.pksubbantracker.com/" data-width="100%" data-numposts="10" data-order-by="reverse_time"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <MenuBar/>
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
    setModalOpen: actions.setModalOpen
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
