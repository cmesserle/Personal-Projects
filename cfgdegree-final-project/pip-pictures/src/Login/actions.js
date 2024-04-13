export const loginSuccess = (userID, username) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: {
        userID,
        username,
      },
    };
  };
  
  export const loginFailure = (error) => {
    return {
      type: 'LOGIN_FAILURE',
      payload: {
        error,
      },
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };