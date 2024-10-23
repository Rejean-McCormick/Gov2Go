// Initial authentication state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
};

// Auth reducer to handle authentication state
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return handleLoginSuccess(state, action);
        case 'LOGOUT':
            return handleLogout(state);
        case 'LOGIN_FAILURE':
            return { 
                ...state, 
                error: action.payload, 
                isAuthenticated: false 
            };
        case 'REGISTER_SUCCESS':
            return handleLoginSuccess(state, action);
        case 'REGISTER_FAILURE':
            return { 
                ...state, 
                error: action.payload, 
                isAuthenticated: false 
            };
        default:
            return state;
    }
};

// Helper function to handle successful login
const handleLoginSuccess = (state, action) => {
    const { token, user } = action.payload;
    return {
        ...state,
        isAuthenticated: true,
        user,
        token,
        error: null,
    };
};

// Helper function to handle logout
const handleLogout = (state) => {
    return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
    };
};

export default authReducer;
 
