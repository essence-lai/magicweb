import React from 'react';
import CardSummary from './CardSummary';
import { Link } from 'react-router-dom';

const CardList = ({cards}) => {
    return (
        <div className="card-list section">
            <div className="card z-depth-0 card-summary">
                { cards && cards.map(card => {
                    return (
                        <Link to={'/card/' + card.id } key={ card.id }>
                            <CardSummary card={card}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
};

export default CardList;