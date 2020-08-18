export const createDeck = (deck) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyc call to database
        const firestore = getFirestore(),
            profile = getState().firebase.profile,
            authorId = getState().firebase.auth.uid;

            firestore.collection('decks').add({
                name: deck.name,
                commander: deck.commander,
                partnerCommander: deck.partnerCommander,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createdAt: new Date()
            }).then(() => {
                dispatch({ type: 'CREATE_DECK', deck });
            }).catch((err) => {
                dispatch({ type: 'CREATE_DECK_ERROR', err });
            });
    }
};

export const updateDeck = (deck) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyc call to database
        const firestore = getFirestore();

        firestore.collection('decks').doc(deck.id).update({name: deck.name, commander: deck.commander}).then(() => {
            dispatch({type: 'UPDATE_DECK', deck});
        }).catch((err) => {
            dispatch({type: 'UPDATE_DECK', err});
        });
    }
};