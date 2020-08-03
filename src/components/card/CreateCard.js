import React, { Component } from 'react';

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
        console.log(this.state);
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add Card</h5>

                    <div className="input-field">
                        <label htmlFor="email">Card Namne</label>
                        <input type="text" id="name" onChange={this.handleChange}/>
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

export default CreateCard;