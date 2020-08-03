import React from 'react';

const CardSummary = ({card}) => {
    return (
        <div className="card-content grey-text text-darken-3">
            <span className="card-title">{ card.title }</span>
            <p>{ card.content }</p>
            <p>Quantity: { card.quantity }</p>
        </div>

    )
};

export default CardSummary;