const initState = {
    decks: []
};

const deckReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_DECK':
            console.log('created deck', action.deck);
            return state;

        case 'CREATE_DECK_ERROR':
            console.log('create deck error', action.err);
            return state;

        case 'UPDATE_DECK':
            console.log('updated deck', action.deck);
            return state;

        case 'UPDATE_DECK_ERROR':
            console.log('updated deck error', action.err);
            return state;

        default:
            return state;
    }
};

export default deckReducer;