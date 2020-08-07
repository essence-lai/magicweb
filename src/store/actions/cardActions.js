export const createCard = (cards) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyc call to database
        const firestore = getFirestore(),
            profile = getState().firebase.profile,
            authorId = getState().firebase.auth.uid;

        for (let card of cards ) {
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
    }
};