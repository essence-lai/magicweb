import React from 'react';

const CardDetails = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container section card-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Card Title - { id }</span>
                    <p>BLAH BLAH BLAH BLAHC</p>
                </div>

                <div className="card-action grey lighten-4 grey-text">
                    <div>Stuff about the card</div>
                    <div> mana cost</div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;