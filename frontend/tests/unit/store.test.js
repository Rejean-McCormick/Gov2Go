import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../../src/store/reducers/rootReducer';
import * as actions from '../../src/store/actions/actionTypes';

// Sample initial state for testing
const initialState = {
    auth: {
        isAuthenticated: false,
        user: null,
        token: null,
    },
    otherState: {} // Placeholder for other parts of the state
};

// Mock actions
const loginAction = {
    type: actions.LOGIN_SUCCESS,
    payload: { user: { id: 1, name: 'John Doe' }, token: 'abc123' },
};

const logoutAction = {
    type: actions.LOGOUT,
};

// Middleware setup (using thunk and logger for testing purposes)
const middleware = [thunk, logger];

describe('Redux Store Tests', () => {
    let store;

    beforeEach(() => {
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(...middleware)
        );
    });

    // Test state initialization with reducers
    it('should initialize state with combined reducers', () => {
        const currentState = store.getState();
        expect(currentState).toEqual(initialState);
    });

    // Test state changes with dispatched actions
    it('should update state correctly when actions are dispatched', () => {
        store.dispatch(loginAction);
        const currentState = store.getState();
        expect(currentState.auth).toEqual({
            isAuthenticated: true,
            user: { id: 1, name: 'John Doe' },
            token: 'abc123',
        });

        store.dispatch(logoutAction);
        const updatedState = store.getState();
        expect(updatedState.auth).toEqual({
            isAuthenticated: false,
            user: null,
            token: null,
        });
    });

    // Test middleware functionality
    it('should invoke middleware correctly when actions are dispatched', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
        store.dispatch(loginAction);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
 
