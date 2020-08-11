import React from 'react';
import CardSummary from './CardSummary';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const colorsIncluded = ({ card, colors }) => {
    let isIncluded = 0;

    for (let color of colors) {
        if(_.includes(card.color_identity, color)) {
            isIncluded+= 1;
        }
    }

    return isIncluded === colors.length;
};

const CardList = ({cards, cmc, r, g, b, w, u }) => {
    const options = { cmc, r, g, b, w, u};
    let isOptions = false,
        cm = null,
        colors = [];

    Object.keys(options).forEach((key, index) => {
       if(options[key]){
           isOptions = true;
           switch(key) {
               case 'cmc':
                   cm = parseInt(cmc);
                   break;
               case 'r':
                   colors.push('R');
                   break;
               case 'g':
                   colors.push('G');
                   break;
               case 'b':
                   colors.push('B');
                   break;
               case 'w':
                   colors.push('W');
                   break;
               case 'u':
                   colors.push('U');
                   break;
               default:
                   break;
           }
       }
    });
    if (isOptions) {
        return (
            <div className="card-list section">
                <div className="card z-depth-0 card-summary">
                    { cards && cards.map(card => {
                        if (_.isNumber(cm) && colors.length > 0) {
                            if ((_.isNumber(cm) && cm === card.cmc) && (colors.length > 0 && colorsIncluded({ card, colors }))) {
                                return (
                                    <Link to={'/card/' + card.id } key={ card.id }>
                                        <CardSummary card={card}/>
                                    </Link>
                                )
                            }
                            return null;
                        } else if (_.isNumber(cm)) {
                            if (cm === card.cmc) {
                                return (
                                    <Link to={'/card/' + card.id } key={ card.id }>
                                        <CardSummary card={card}/>
                                    </Link>
                                )
                            }
                            return null;

                        } else if (colors.length > 0 ) {
                            if (colorsIncluded({ card, colors })) {
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