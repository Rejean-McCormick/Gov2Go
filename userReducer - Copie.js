 
// Initial user state
const initialState = {
    profile: {
        name: '',
        email: '',
        // Add any other relevant user fields here
    },
    error: null,
};

// User reducer to handle user-specific state
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_PROFILE':
            return updateUserProfile(state, action);
        case 'CLEAR_USER_DATA':
            return clearUserData(state);
        case 'USER_ACTION_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Helper function to update user profile
const updateUserProfile = (state, action) => {
    return {
        ...state,
        profile: { ...state.profile, ...action.payload },
        error: null,
    };
};

// Helper function to clear user data
const clearUserData = (state) => {
    return {
        ...state,
        profile: {
            name: '',
            email: '',
            // Reset other user fields here
        },
        error: null,
    };
};

export default userReducer;
