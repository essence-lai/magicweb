export const createCard = (card) => {
    return (dispatch, getState) => {
        // make asyc call to database
        dispatch({ type: 'CREATE_CARD', card });
    }
};

