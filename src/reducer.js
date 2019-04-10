const initialState = {
    user: null,
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case LOGOUT:
            return {
                ...state,
                user: action.payload,
            };
    }
    
    return state;
}

export {
    LOGIN,
    LOGOUT,
    
    reducer,
};
