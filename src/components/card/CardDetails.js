import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';


const CardDetails = (props) => {
    const { card, auth } = props;

    if(!auth.uid) return <Redirect to='/signin'/>;

    if(card) {
        return (
            <div className="container section card-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{ card.title}</span>
                        <p>{ card.content }</p>
                        <p>Quantity: { card.quantity }</p>
                    </div>

                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {card.authorFirstName} {card.authorLastName}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container center">
                <p>Loading Card...</p>
            </div>
        )
    }
};
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id,
        cards = state.firestore.data.cards,
        card = cards ? cards[id] : null;
    return {
        card: card,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'cards' }
    ])
)(CardDetails);