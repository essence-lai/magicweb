import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import _ from "lodash";
import UpdateDeck from './UpdateDeck';

const DeckDetails = (props) => {
    const { deck, auth } = props;

    if(!auth.uid) return <Redirect to='/signin'/>;

    if(deck) {
        return (
            <div>
                <div className="container section card-details">
                    <div className="row">
                        {
                            _.get(deck.partnerCommander, 'image_uris') &&
                                <div className="col s12 m3 push-m3 center">
                                    {
                                        _.get(deck.commander, 'image_uris') &&
                                        <div>
                                            <h5>Commander</h5>

                                            <img
                                                style={{ maxHeight: '100%', maxWidth: '100%'}}
                                                src={ deck.commander.image_uris.border_crop }
                                                alt={ deck.commander.image_uris.normal }
                                            />
                                        </div>

                                    }
                                </div>
                        }

                        {
                            _.get(deck.partnerCommander, 'image_uris') &&
                            <div className="col s12 m3 push-m3 center">
                                <div>
                                    <h5>Partner Commander</h5>

                                    <img
                                        style={{ maxHeight: '100%', maxWidth: '100%'}}
                                        src={ deck.partnerCommander.image_uris.border_crop }
                                        alt={ deck.partnerCommander.image_uris.normal }
                                    />
                                </div>
                            </div>
                        }

                        {
                            !_.get(deck.partnerCommander, 'image_uris') &&
                                <div className="col s12 m3 push-m5 center">
                                    {
                                        _.get(deck.commander, 'image_uris') &&
                                        <div>
                                            <h5>Commander</h5>

                                            <img
                                                style={{ maxHeight: '100%', maxWidth: '100%'}}
                                                src={ deck.commander.image_uris.border_crop }
                                                alt={ deck.commander.image_uris.normal }
                                            />
                                        </div>

                                    }
                                </div>
                        }

                        <div className="col s12 m12">
                            <div className="card z-depth-1 card-summary">
                                <div className="card-content grey-text text-darken-3">
                                    <span className="card-title"><UpdateDeck props={ props }/></span>

                                    <div className="card-action">
                                        <div>
                                            Created By: { deck.authorFirstName } { deck.authorLastName }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container center">
                <p>Loading Deck...</p>
            </div>
        )
    }
};
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id,
        decks = state.firestore.data.decks,
        deck = decks ? decks[id] : null;
    return {
        deck: deck,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'decks' }
    ])
)(DeckDetails);