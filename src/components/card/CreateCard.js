import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../store/actions/cardActions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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

        //console.log(this.state);
        //this.props.createCard(this.state);
        //this.props.history.push('/');
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
        this.setState({
            checkout: [...this.state.checkout, item]
        });
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
                    <div className="col s2">
                        <h5 className="grey-text text-darken-3">Check out</h5>
                        { this.state.checkout && this.state.checkout.map(item => {
                            return (
                                <div key={item.id}>
                                    { item.name }
                                </div>

                            )
                        })}
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