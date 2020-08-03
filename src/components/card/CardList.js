import React from 'react';
import CardSummary from './CardSummary';

const CardList = ({cards}) => {
    return (
        <div className="card-list section">
            <div className="card z-depth-0 card-summary">
                { cards && cards.map(card => {
                    return <CardSummary card={card} key={card.id}/>
                })}
            </div>
        </div>
    )
};

export default CardList;