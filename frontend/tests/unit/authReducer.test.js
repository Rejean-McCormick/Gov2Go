// Import necessary libraries and the reducer
import authReducer from '../../src/store/reducers/authReducer';
import * as actions from '../../src/store/actions/authActions';

// Sample initial state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

// Mock data
const mockUser = { id: 1, name: 'John Doe' };
const mockToken = 'abc123';
const newMockToken = 'xyz789';

describe('authReducer Tests', () => {
    // Test state changes on successful login action
    it('should update state with user data and token on login action', () => {
        const loginAction = {
            type: actions.LOGIN_SUCCESS,
            payload: { user: mockUser, token: mockToken },
        };
        const newState = authReducer(initialState, loginAction);
        expect(newState).toEqual({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
        });
    });

    // Test state reset on logout action
    it('should clear state on logout action', () => {
        const loggedInState = {
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
        };
        const logoutAction = {
            type: actions.LOGOUT,
        };
        const newState = authReducer(loggedInState, logoutAction);
        expect(newState).toEqual({
            isAuthenticated: false,
            user: null,
            token: null,
        });
    });

    // Test token update behavior
    it('should update token on token refresh action', () => {
        const loggedInState = {
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
        };
        const tokenRefreshAction = {
            type: actions.TOKEN_REFRESH,
            payload: { token: newMockToken },
        };
        const newState = authReducer(loggedInState, tokenRefreshAction);
        expect(newState).toEqual({
            isAuthenticated: true,
            user: mockUser,
            token: newMockToken,
        });
    });
});
 
