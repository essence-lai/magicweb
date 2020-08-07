import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';


const CardDetails = (props) => {
    const { card, auth } = props;

    if(!auth.uid) return <Redirect to='/signin'/>;

    if(card) {
        return (
            <div style={{ backgroundImage: `url(${card.image_uris.art_crop })`, backgroundSize: 'cover', height: '100vh' }}>
                <div className="container section card-details">
                    <div className="row">
                        <div className="col s12 m8">
                            <div className="card white">
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <span className="card-title">{ card.name } <p className="right">Quantity: { card.quantity }</p></span>
                                        <p style={{ marginTop: '40px'}}>{ card.oracle_text }</p>

                                        <span className="card-title" style={{ marginTop: '40px'}}>Legalities</span>
                                        <div className="row">
                                            { card.legalities && Object.entries(card.legalities).map(([key, value]) => {
                                                return (
                                                    <p style={{ marginTop: '20px'}} className="col s6">{key}: {value}</p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <img
                                style={{ maxHeight: '100%', maxWidth: '100%'}}
                                src={ card.image_uris.border_crop }
                                alt={ card.image_uris.normal }
                            />
                        </div>

                        <div className="col s12 m12">
                            <div className="card white">
                                <div className="card-stacked">
                                    <div className="card-content row ">
                                        <span className="card-title col s12">Prices</span>
                                        {card.prices && Object.entries(card.prices).map(([key, value]) => {
                                            return (
                                                <p className="col s2">{key}: {value}</p>
                                            )
                                        })}
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
                <p>Loading Card...</p>
            </div>
        )
    }
};
const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id,
        cards = state.firestore.data.cards,
        card = cards ? cards[id] : null;
    return {
        card: card,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'cards' }
    ])
)(CardDetails);