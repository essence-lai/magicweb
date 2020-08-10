import React from 'react';
import CardSummary from './CardSummary';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const CardList = ({cards, cmc}) => {
    console.log(cmc);
    if (cmc) {
        const cm = parseInt(cmc);
        return (
            <div className="card-list section">
                <div className="card z-depth-0 card-summary">
                    { cards && cards.map(card => {
                        if (_.isNumber(cm)) {
                            console.log('hello');
                            if (cm === card.cmc) {
                                return (
                                    <Link to={'/card/' + card.id } key={ card.id }>
                                        <CardSummary card={card}/>
                                    </Link>
                                )
                            }
                            return null;
                        }
                        return (
                            <Link to={'/card/' + card.id } key={ card.id }>
                                <CardSummary card={card}/>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
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