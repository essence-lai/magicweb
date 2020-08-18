import React from 'react';
import _ from 'lodash';

const DeckSummary = ({ deck }) => {
    const { name, commander, partnerCommander } = deck;
    return (
        <div className="card z-depth-1 card-summary">
            {
                _.isEmpty(partnerCommander) ?
                    <div className="card-image row">
                        {
                            _.get(commander, 'image_uris') &&  <img
                                className="col s12 m12"
                                style={{ maxHeight: '150px', maxWidth: '100vw', objectFit: 'cover'}}
                                src={ deck.commander.image_uris.art_crop }
                                alt={ deck.commander.image_uris.normal }
                            />
                        }

                    </div>
                    :
                    <div className="card-image row">
                        {
                            _.get(commander, 'image_uris') && <img
                                className="col s12 m6"
                                style={{maxHeight: '150px', maxWidth: '100vw', objectFit: 'cover'}}
                                src={deck.commander.image_uris.art_crop}
                                alt={deck.commander.image_uris.normal}
                            />
                        }
                        {
                            _.get(partnerCommander, 'image_uris') &&  <img
                                className="col s12 m6"
                                style={{ maxHeight: '150px', maxWidth: '100vw', objectFit: 'cover'}}
                                src={ deck.partnerCommander.image_uris.art_crop }
                                alt={ deck.partnerCommander.image_uris.normal }
                            />
                        }

                    </div>

            }
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{ name } - { deck.commander.name } { deck.partnerCommander.name && `/ ${ deck.partnerCommander.name }`}</span>

                <div className="card-action">
                    <div>
                        Created By: { deck.authorFirstName } { deck.authorLastName }
                    </div>
                </div>
            </div>
        </div>

    )
};

export default DeckSummary;