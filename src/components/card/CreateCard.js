import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../store/actions/cardActions';

class CreateCard extends Component {
    state = {
        title: '',
        content: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createCard(this.state);
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add Card</h5>

                    <div className="input-field">
                        <label htmlFor="email">Card Name</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Details</label>
                        <textarea id="content" className="materialize-textarea " onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Add Card</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCard: (card) => dispatch(createCard(card))
    }
};
export default connect(null, mapDispatchToProps)(CreateCard);