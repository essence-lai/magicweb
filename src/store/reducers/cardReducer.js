const initState = {
    cards: []
};

const cardReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CARD':
            console.log('created card', action.card);
            return state;

        case 'CREATE_CARD_ERROR':
            console.log('create card error', action.err);
            return state;

        default:
            return state;
    }
};

export default cardReducer;