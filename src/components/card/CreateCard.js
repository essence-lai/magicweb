import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../store/actions/cardActions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

class CreateCard extends Component {
    state = {
        title: '',
        results: [],
        checkout: [],
        error: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createCard(this.state.checkout);
        this.props.history.push('/');
    };

    searchCard = (e) => {
        axios.get('https://api.scryfall.com/cards/search?q='+this.state.title).then(
            res => {
                console.log(res);
                this.setState({
                    results: res.data.data
                })
            }
        ).catch((err) => {
            console.log(err);
            this.setState({
                error: true
            })
        })
    };

    addToCheckout = (item) => {
        const newItem = _.pick(item, [ 'id', 'name', 'cmc', 'color_identity', 'colors', 'flavor_text', 'image_uris', 'keywords', 'legalities', 'mana_cost', 'oracle_text', 'power', 'prices', 'toughness', 'set_name', 'set_type', 'type_line', 'rarity' ]),
            existingItem = _.find(this.state.checkout, function (item) { return item.id === newItem.id });

        if (existingItem) {
            const index = _.findIndex(this.state.checkout, function (item) { return item.id === newItem.id });
            existingItem.quantity += 1;

            this.setState({
                checkout: [ ...this.state.checkout.slice(0, index), existingItem, ...this.state.checkout.slice(index + 1) ]
            });

        } else {
            this.setState({
                checkout: [ ...this.state.checkout, { ...newItem, quantity: 1 }]
            });
        }
    };

    removeCard = (item) => {
        const index = _.findIndex(this.state.checkout, function (card) { return card.id === item.id});

        if (item.quantity > 1) {
            item.quantity -= 1;

            this.setState({
                checkout: [...this.state.checkout.slice(0, index), item, ...this.state.checkout.slice(index + 1) ]
            });

        } else {
            this.setState({
                checkout: [...this.state.checkout.slice(0, index), ...this.state.checkout.slice(index + 1) ]
            });
        }
    };

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>;

        return (
                <div className="row container">
                    <div className="col s12 m9">
                        <h5 className="grey-text text-darken-3">Search Card</h5>
                        <div className="input-field">
                            <label htmlFor="email">Card Name</label>
                            <input type="text" id="title" onChange={this.handleChange} />
                            <button className="btn pink lighten-1 z-depth-0" onClick={this.searchCard}>Search</button>
                        </div>
                        <div className='row'>
                            { this.state.results && this.state.results.map(item => {
                                return (
                                    <div className="col s3" key={ item.id } onClick={this.addToCheckout.bind(this, item)}>
                                        { item.image_uris && item.image_uris.normal ?
                                            <img
                                                style={{ maxHeight: '100%', maxWidth: '100%'}}
                                                className="s3"
                                                src={ item.image_uris.normal }
                                                alt={ item.image_uris.border_crop }
                                            />
                                            :
                                            null
                                        }
                                        <p className="center"> { item.name }</p>

                                    </div>

                                )
                            })}
                        </div>

                    </div>
                    <div className="col s12 m3">
                        <div className="row">
                            <div className="col s12 center-row">
                                <h5 className="grey-text text-darken-3 col s8">Check out</h5>
                                <button className="btn waves-effect lighten-1 z-depth-0 col s5" onClick={this.handleSubmit}>Submit</button>
                            </div>

                            { this.state.checkout && this.state.checkout.map(item => {
                                return (
                                    <div className="col s12 margin-top center-row" key={ item.id }>
                                        <div className="col s7">
                                            { item.name }
                                        </div>

                                        <div className="col s3">
                                            x { item.quantity }
                                        </div>

                                        <div className="col s2">
                                            <button className="btn-floating waves-effect red" ><i className="material-icons icons-white" onClick={ this.removeCard.bind(this, item)}>remove</i></button>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth
  }
};
const mapDispatchToProps = (dispatch) => {
    return {
        createCard: (card) => dispatch(createCard(card))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);