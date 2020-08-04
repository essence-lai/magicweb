import React, { Component } from 'react';
import Notifications from './Notifications';
import  CardList from '../card/CardList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
    render () {
        const { cards } = this.props;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <CardList cards={cards}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        cards: state.firestore.ordered.cards
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'cards' }
    ])
)(Dashboard);