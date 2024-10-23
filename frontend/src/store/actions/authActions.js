// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Action creator for login
export const loginAction = (userCredentials) => async (dispatch) => {
    try {
        const response = await api.post('/login', userCredentials);
        const { token, user } = response.data;

        // Dispatch login success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { token, user },
        });

        // Store the token in localStorage
        localStorage.setItem('authToken', token);
    } catch (error) {
        // Dispatch login failure action
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.message,
        });
    }
};

// Action creator for logout
export const logoutAction = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');

    // Dispatch logout action
    dispatch({ type: LOGOUT });
};

// Action creator for register
export const registerAction = (userDetails) => async (dispatch) => {
    try {
        const response = await api.post('/register', userDetails);
        const { token, user } = response.data;

        // Dispatch register success action
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { token, user },
        });

        // Store the token in localStorage
        localStorage.setItem('authToken', token);
    } catch (error) {
        // Dispatch register failure action
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.message,
        });
    }
};
 
