// Import necessary libraries and the reducer
import userReducer from '../../src/store/reducers/userReducer';
import * as actions from '../../src/store/actions/userActions';

// Sample initial state for the user reducer
const initialState = {
    userDetails: null,
    isLoading: false,
    error: null,
};

// Mock user data
const mockUserDetails = { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com' };

describe('userReducer Tests', () => {
    // Test profile update action
    it('should update the state with new user details on profile update action', () => {
        const updateUserAction = {
            type: actions.UPDATE_USER_SUCCESS,
            payload: { userDetails: mockUserDetails },
        };
        const newState = userReducer(initialState, updateUserAction);
        expect(newState).toEqual({
            ...initialState,
            userDetails: mockUserDetails,
        });
    });

    // Test user deletion action
    it('should clear the state on user deletion action', () => {
        const stateWithUser = {
            userDetails: mockUserDetails,
            isLoading: false,
            error: null,
        };
        const deleteUserAction = {
            type: actions.DELETE_USER,
        };
        const newState = userReducer(stateWithUser, deleteUserAction);
        expect(newState).toEqual({
            ...initialState,
            userDetails: null,
        });
    });

    // Test resetting user data
    it('should reset the user state when reset action is dispatched', () => {
        const stateWithUser = {
            userDetails: mockUserDetails,
            isLoading: false,
            error: null,
        };
        const resetAction = {
            type: actions.RESET_USER,
        };
        const newState = userReducer(stateWithUser, resetAction);
        expect(newState).toEqual(initialState);
    });
});
 
