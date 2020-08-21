import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDeck } from '../../store/actions/deckActions';


class UpdateDeck extends Component {
    state = {
        id: this.props.props.match.params.id,
        name: this.props.props.deck.name,
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
        const deck = { id: this.state.id, name: this.state.name };

        this.props.updateDeck(deck);

        this.toggleEdit();
    };

    render() {
        return (
            this.state.edit ?
                <form>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
                        <button className="btn waves-effect grey right" onClick={this.handleSubmit}><i className="material-icons center">edit</i></button>
                    </div>
                </form>
                :
                <div>{ this.state.name } - { this.props.props.deck.commander.name } { this.props.props.deck.partnerCommander.name && `/ ${ this.props.props.deck.partnerCommander.name }`}  <button className=" right btn waves-effect grey" onClick={this.toggleEdit}><i className="material-icons center">edit</i></button>
                </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDeck: (card) => dispatch(updateDeck(card))
    }
};

export default connect(null, mapDispatchToProps)(UpdateDeck);