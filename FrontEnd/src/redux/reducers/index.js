const statoIniziale = {
  content: [],
  contoCart: 0,
};

const cartReducer = (state = statoIniziale, action) => {
  switch (action.type) {
    case "FILL_CART": {
      const prodottoEsistente = state.content.find((prodotto) => prodotto.id === action.payload.id);

      if (prodottoEsistente) {
        return state;
      } else {
        return {
          ...state,
          content: [...state.content, action.payload],
          contoCart: state.contoCart + (action.payload.prezzo || 0),
        };
      }
    }

    case "REMOVE_CART": {
      const rimuoviProdotto = state.content[action.payload];
      return {
        ...state,
        content: state.content.filter((_, i) => i !== action.payload),
        contoCart: state.contoCart - (rimuoviProdotto?.prezzo || 0),
      };
    }

    case "RESET_CART":
      return {
        ...state,
        content: [],
        contoCart: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
