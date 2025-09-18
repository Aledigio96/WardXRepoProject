const initialState = {
  annunci: [],
  loading: false,
  error: null,
};

const annunciReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ANNUNCI":
      return {
        ...state,
        annunci: action.payload,
        loading: false,
        error: null,
      };
    case "LOAD_ANNUNCI_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default annunciReducer;
