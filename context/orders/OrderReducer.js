import * as ActionTypes from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case ActionTypes.SELECT_PRODUCT:
      return {
        ...state,
        products: [...action.payload],
      };
    case ActionTypes.PRODUCT_QUANTITY:
      const filterProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      return {
        ...state,
        products: [...filterProducts, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
