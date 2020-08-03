import React from 'react';
import CardSummary from './CardSummary';

const CardList = () => {
    return (
        <div className="card-list section">
            <div className="card z-depth-0 card-summary">
                <CardSummary/>
                <CardSummary/>
                <CardSummary/>
                <CardSummary/>
                <CardSummary/>
            </div>
        </div>
    )
};

export default CardList;