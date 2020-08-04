import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../store/actions/cardActions';
import { Redirect } from 'react-router-dom';

class CreateCard extends Component {
    state = {
        title: '',
        content: '',
        quantity: 0,
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
        this.props.history.push('/');
    };

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>;

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
                        <label htmlFor="email">Quantity</label>
                        <input type="number" id="quantity" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Add Card</button>
                    </div>
                </form>
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