// Initial state for user settings
const initialState = {
    theme: 'light', // Default theme
    notificationsEnabled: true, // Default notification setting
};

// Reducer to manage user settings
const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_THEME':
            return updateTheme(state, action);
        case 'TOGGLE_NOTIFICATIONS':
            return toggleNotifications(state);
        default:
            return state;
    }
};

// Helper function to update the theme
const updateTheme = (state, action) => {
    return {
        ...state,
        theme: action.payload, // Update the theme with the new value
    };
};

// Helper function to toggle notifications
const toggleNotifications = (state) => {
    return {
        ...state,
        notificationsEnabled: !state.notificationsEnabled, // Toggle the notification preference
    };
};

export default settingsReducer;
 
