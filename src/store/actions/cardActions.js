export const createCard = (card) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asyc call to database
        const firestore = getFirestore();

        firestore.collection('cards').add({
            ...card,
            authorFirstName: 'Essence',
            authorLastName: 'Lai',
            authorId: 1234,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_CARD', card });
        }).catch((err) => {
            dispatch({ type: 'CREATE_CARD_ERROR', err });
        });
    }
};

