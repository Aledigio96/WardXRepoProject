const initialState = {
  user: null,
  token: null, // Aggiungi il campo per il token
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token, // Memorizza il token
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null, // Rimuovi anche il token durante il logout
        isAuthenticated: false,
      };
    case "UPLOAD_AVATAR_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.payload,
        },
      };
    case "SET_USER_FROM_STORAGE":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
