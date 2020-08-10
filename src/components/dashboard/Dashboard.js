import React, { Component } from 'react';
import  CardList from '../card/CardList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
    state = {
        "cmc": localStorage.getItem('cmc') || null
    };

    handleChange = (e) => {
        localStorage.setItem(e.target.id, e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubnmit = (e) => {
        localStorage.clear();
    };

    render () {
        const { cards } = this.props;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m2">
                        <form onSubmit={this.handleSubnmit}>
                            <h5 className="grey-text text-darken-3">Filter</h5>

                            <div className="input-field">
                                <label htmlFor="cmc">CMC</label>
                                <input type="number" id="cmc" onChange={this.handleChange}/>
                            </div>

                            <div className="input-field">
                                <button className="btn pink lighten-1 z-depth-0">Clear</button>
                            </div>
                        </form>
                    </div>
                    <div className="col s12 m10">
                        <CardList cards={cards} cmc={this.state.cmc}/>
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
        { collection: 'cards', orderBy: ['color_identity'] }
    ])
)(Dashboard);