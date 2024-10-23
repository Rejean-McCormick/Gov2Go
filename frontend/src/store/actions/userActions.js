// Action types
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// Action creator for fetching user details
export const fetchUserDetails = (userId) => async (dispatch) => {
    try {
        const response = await api.get(`/user/${userId}`);
        const user = response.data;

        // Dispatch fetch success action
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: user,
        });
    } catch (error) {
        // Dispatch fetch failure action
        dispatch({
            type: FETCH_USER_FAILURE,
            payload: error.message,
        });
    }
};

// Action creator for updating user details
export const updateUserDetails = (userData) => async (dispatch) => {
    try {
        const response = await api.put('/user', userData);
        const updatedUser = response.data;

        // Dispatch update success action
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updatedUser,
        });
    } catch (error) {
        // Dispatch update failure action
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.message,
        });
    }
};

// Action creator for deleting user account
export const deleteUserAccount = (userId) => async (dispatch) => {
    try {
        const response = await api.delete(`/user/${userId}`);

        // Dispatch delete success action
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: userId,
        });
    } catch (error) {
        // Dispatch delete failure action
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message,
        });
    }
};
 
