export const createCard = (cards) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyc call to database
        const firestore = getFirestore(),
            profile = getState().firebase.profile,
            authorId = getState().firebase.auth.uid;

        for (let card of cards ) {

            firestore.collection('cards').doc(card.id).get().then(function(doc) {
                if(doc.exists) {
                    const { quantity } = doc.data(),
                        updateQuantity = parseInt(quantity) + card.quantity;

                    firestore.collection('cards').doc(card.id).update({quantity: updateQuantity}).then(() => {
                        dispatch({type: 'UPDATE_CARD', card});
                    }).catch((err) => {
                        dispatch({type: 'UPDATE_CARD_ERROR', err});
                    });
                } else {
                    firestore.collection('cards').doc(card.id).set({
                        ...card,
                        authorFirstName: profile.firstName,
                        authorLastName: profile.lastName,
                        authorId: authorId,
                        createdAt: new Date()
                    }).then(() => {
                        dispatch({ type: 'CREATE_CARD', card });
                    }).catch((err) => {
                        dispatch({ type: 'CREATE_CARD_ERROR', err });
                    });

                }
            }).catch((err) => {
               dispatch({ type: 'CREATE_CARD_ERROR', err });
            });
        }
    }
};

export const updateCard = (card) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyc call to database
        const firestore = getFirestore();

        firestore.collection('cards').doc(card.id).update({quantity: card.quantity}).then(() => {
            dispatch({type: 'UPDATE_CARD', card});
        }).catch((err) => {
            dispatch({type: 'UPDATE_CARD_ERROR', err});
        });
    }
};