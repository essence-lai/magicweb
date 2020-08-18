import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDeck } from '../../store/actions/deckActions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

class CreateDeck extends Component {
    state = {
        name: '',
        commander: {},
        results: [],
        partner: false,
        partnerCommander: {},
        error: false,
        deckError: false
    };

    handleChange = (e) => {
        let value = e.target.value;


        if(_.includes(['partner'], e.target.id)){
            value = document.getElementById(e.target.id).checked;
        }

        if (!value) {
            this.setState({
                [e.target.id]: value,
                partnerCommander: {}
            });
        } else {
            this.setState({
                [e.target.id]: value
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (_.isEmpty(this.state.name) || _.isEmpty(this.state.commander) || (this.state.partner && _.isEmpty(this.state.partnerCommander))) {
            this.setState({ deckError: true });
        } else {
            this.setState({ deckError: false });

            this.props.createDeck(this.state);
            this.props.history.push('/decks');
        }
    };

    searchCard = (e) => {
        axios.get('https://api.scryfall.com/cards/search?q='+this.state.title).then(
            res => {
                console.log(res);
                this.setState({
                    results: res.data.data
                });
            }
        ).catch((err) => {
            console.log(err);
            this.setState({
                error: true
            });
        })
    };

    addToCheckout = (item) => {
        const commander = _.pick(item, [ 'id', 'name', 'cmc', 'color_identity', 'colors', 'flavor_text', 'image_uris', 'keywords', 'legalities', 'mana_cost', 'oracle_text', 'power', 'prices', 'toughness', 'set_name', 'set_type', 'type_line', 'rarity' ]);

        if (this.state.partner) {
            this.setState({
                partnerCommander: commander
            });
        } else {
            this.setState({
                commander
            });
        }
    };

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>;

        return (
            <div className="row container">
                <div className="col s12 m12">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Create Commander Deck</h5>

                        <div className="input-field">
                            <label htmlFor="name">Deck Name</label>
                            <input type="text" id="name" onChange={this.handleChange}/>
                        </div>

                        {
                            this.state.commander &&
                            <div className="margin-top">
                                <label>Commander</label>
                                <div>{this.state.commander.name}</div>
                            </div>
                        }

                        <p>
                            <label htmlFor="partner">
                                <input type="checkbox" id="partner" onChange={this.handleChange}/>
                                <span>Partner</span>
                            </label>
                        </p>

                        {
                            this.state.partner &&
                            <div className="margin-top">
                                <label>Partner Commander</label>
                                <div>{this.state.partnerCommander.name}</div>
                            </div>
                        }

                        <div className="input-field">
                            <button className="btn waves-effect lighten-1 z-depth-0" onClick={this.handleSubmit}>Create Deck</button>
                            <div className="red-text center">
                                { this.state.deckError ? <p>Make sure your deck includes a name and a commander, if you checked partner, also make sure you have included a partner commander</p>: null }
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col s12 m12">
                    <h5 className="grey-text text-darken-3">Search Commander</h5>
                    <div className="input-field">
                        <label htmlFor="email">Commander Name</label>
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
        createDeck: (card) => dispatch(createDeck(card))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);