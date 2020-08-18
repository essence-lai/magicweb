import React, { Component } from 'react';
import  DeckList from './DeckList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class DeckDashboard extends Component {

    render () {
        const { decks } = this.props;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m10">
                        <DeckList decks={decks}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state.firestore.ordered.decks
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'decks', orderBy: ['name'] }
    ])
)(DeckDashboard);