import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCard } from '../../store/actions/cardActions';


class UpdateCard extends Component {
    state = {
        id: this.props.card.id,
        quantity: this.props.card.quantity,
        edit: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    toggleEdit = () => {
        this.setState({
           edit: !this.state.edit
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const card = { id: this.state.id, quantity: this.state.quantity };

        this.props.updateCard(card);

        this.toggleEdit();
    };

    render() {
         return (
                 this.state.edit ?
                     <div className="right">
                         <form>
                             <h5>Quantity</h5>
                             <div className="input-field">
                                 <input type="number" id="quantity" onChange={this.handleChange} value={this.state.quantity} />
                             </div>
                             <div className="input-field">
                                 <button className="btn waves-effect grey right" onClick={this.handleSubmit}><i className="material-icons center">edit</i></button>
                             </div>
                         </form>
                     </div>:
                     <div className="right">Quantity: { this.state.quantity } <button className="btn waves-effect grey" onClick={this.toggleEdit}><i className="material-icons center">edit</i></button>
                     </div>
         )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCard: (card) => dispatch(updateCard(card))
    }
};

export default connect(null, mapDispatchToProps)(UpdateCard);