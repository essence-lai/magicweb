import React from 'react';

const CardSummary = ({card}) => {
    return (
        <div className="card z-depth-0 card-summary horizontal">
            <div className="card-image">
                <img
                    src={ card.image_uris.small }
                    alt={ card.image_uris.normal }
                />
            </div>
            <div className="card-stacked">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{ card.name } <p className="right">Quantity: { card.quantity }</p></span>
                    <p>{ card.oracle_text }</p>
                </div>

                <div className="card-action">
                    <div className="row">

                        <div className="col s12 m1">
                            CMC: { card.cmc }
                        </div>

                        <div className="col s12 m1">
                            Colors: { card.colors.join('/')}
                        </div>

                        <div className="col s12 m1" style={{ textTransform: 'capitalize' }}>
                            Rarity: { card.rarity }
                        </div>

                        <div className="col s12 m3">
                            Type: { card.type_line }
                        </div>

                        { card.toughness && card.power ?
                            <div className="col s12 m3">
                                Power/Toughness: { card.power }/{ card.toughness }
                            </div>
                            :
                            null
                        }

                        { card.keywords ?
                            <div className="col s12 m3">
                                Keywords: { card.keywords.join(', ') }
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>

    )
};

export default CardSummary;