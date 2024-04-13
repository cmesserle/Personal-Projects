const initialState = {
    isLoggedIn: false,
    userID: '',
    username: '',
    error: null,
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          userID: action.payload.userID,
          username: action.payload.username,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false,
          userID: '',
          username: '',
          error: action.payload.error,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          userID: '',
          username: '',
          error: null,
        };
      default:
        return state;
    }
  };

export default rootReducer;