import React, { Component } from 'react';
import Notifications from './Notifications';
import  CardList from '../card/CardList';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render () {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <CardList cards={this.props.cards}/>
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
    return {
        cards: state.card.cards
    }
};

export default connect(mapStateToProps) (Dashboard);