const initState = {
    cards: [
        { id: '1', title: 'card 1', content: 'blah blah blah'},
        { id: '2', title: 'card 2', content: 'blah blah blah'},
        { id: '3', title: 'card 3', content: 'blah blah blah'}
    ]
};

const cardReducer = (state = initState, action) => {
    return state
};

export default cardReducer;