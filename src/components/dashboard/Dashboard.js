import React, { Component } from 'react';
import  CardList from '../card/CardList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import _ from 'lodash';

class Dashboard extends Component {
    state = {
        "cmc": localStorage.getItem('cmc') || null,
        "r": localStorage.getItem('r') || false,
        "g": localStorage.getItem('g') || false,
        "b": localStorage.getItem('b') || false,
        "w": localStorage.getItem('w') || false,
        "u": localStorage.getItem('u') || false
    };

    handleChange = (e) => {
        let value = e.target.value;

        if(_.includes(['r', 'g', 'b', 'w', 'u'], e.target.id)){
            value = document.getElementById(e.target.id).checked;
        }
        localStorage.setItem(e.target.id, value);
        this.setState({
            [e.target.id]: value
        })
    };

    handleSubmit = (e) => {
        localStorage.clear();
    };

    render () {
        const { cards } = this.props;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m2">
                        <form onSubmit={this.handleSubmit}>
                            <h5 className="grey-text text-darken-3">Filter</h5>

                            <div className="input-field">
                                <label htmlFor="cmc">CMC</label>
                                <input type="number" id="cmc" onChange={this.handleChange}/>
                            </div>

                            <p>
                                <label htmlFor="r" className="input-field">
                                    <input type="checkbox" id="r" onChange={this.handleChange}/>
                                    <span>Red</span>
                                </label>
                            </p>

                            <p>
                                <label htmlFor="g">
                                    <input type="checkbox" id="g" onChange={this.handleChange}/>
                                    <span>Green</span>
                                </label>
                            </p>

                            <p>
                                <label htmlFor="b">
                                    <input type="checkbox" id="b" onChange={this.handleChange}/>
                                    <span>Black</span>
                                </label>
                            </p>

                            <p>
                                <label htmlFor="w">
                                    <input type="checkbox" id="w" onChange={this.handleChange}/>
                                    <span>White</span>
                                </label>
                            </p>

                            <p>
                                <label htmlFor="u">
                                    <input type="checkbox" id="u" onChange={this.handleChange}/>
                                    <span>Blue</span>
                                </label>
                            </p>

                            <div className="input-field">
                                <button className="btn pink lighten-1 z-depth-0">Clear</button>
                            </div>
                        </form>
                    </div>
                    <div className="col s12 m10">
                        <CardList
                            cards={cards}
                            cmc={this.state.cmc}
                            r={this.state.r}
                            g={this.state.g}
                            b={this.state.b}
                            w={this.state.w}
                            u={this.state.u}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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