import React from 'react';
import moment from 'moment';

const CardSummary = ({card}) => {
    return (
        <div className="card z-depth-0 card-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{ card.title }</span>
                <p>{ card.content }</p>
                <p>Quantity: { card.quantity }</p>
                <p className='grey-text'>Posted by { card.authorFirstName } { card.authorLastName }</p>
                <p className='grey-text'>{ moment(card.createdAt.toDate()).calendar()}</p>
            </div>
        </div>

    )
};

export default CardSummary;