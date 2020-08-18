import React from 'react';
import DeckSummary from './DeckSummary';
import { Link } from 'react-router-dom';

const DeckList = ({ decks }) => {
    return (
        <div className="card-list section">
            <div className="card z-depth-0 card-summary">
                { decks && decks.map(deck => {
                    return (
                        <Link to={'/deck/' + deck.id } key={ deck.id }>
                            <DeckSummary deck={deck}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
};

export default DeckList;