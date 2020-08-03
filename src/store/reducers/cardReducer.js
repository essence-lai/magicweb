const initState = {
    cards: [
        { id: '1', title: 'card 1', content: 'blah blah blah', quantity: 1},
        { id: '2', title: 'card 2', content: 'blah blah blah', quantity: 2},
        { id: '3', title: 'card 3', content: 'blah blah blah', quantity: 3}
    ]
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