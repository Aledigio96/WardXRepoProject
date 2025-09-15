const statoIniziale = {
  cart: {
    content: [],
    contoCart: 0,
  },
  login: {
    token: null,
    user: null,
  },
};

const cartReducer = (state = statoIniziale, action) => {
  switch (action.type) {
    case "FILL_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          content: [...state.cart.content, action.payload],
          contoCart: state.cart.contoCart + (action.payload.prezzo || 0),
        },
      };
    case "REMOVE_CART": {
      const rimuoviProdotto = state.cart.content[action.payload];
      return {
        ...state,
        cart: {
          ...state.cart,
          content: state.cart.content.filter((_, i) => i !== action.payload),
          contoCart: state.cart.contoCart - (rimuoviProdotto && rimuoviProdotto.prezzo ? rimuoviProdotto.prezzo : 0),
        },
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
