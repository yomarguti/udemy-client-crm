import * as ActionTypes from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case ActionTypes.SELECT_PRODUCT:
      console.log(state);
      if (state.products.length === 0) {
        return {
          ...state,
          products: [...action.payload],
        };
      }
      const updatedProducts = action.payload.map((product) => {
        const foundProduct = state.products.find((p) => p.id === product.id);
        if (!foundProduct) return { ...product, quantity: 0 };
        return {
          ...product,
          quantity: foundProduct.quantity,
        };
      });

      const total = updatedProducts.reduce((acc, current) => {
        return acc + current.quantity * current.price;
      }, 0);

      return {
        ...state,
        total,
        products: [...updatedProducts],
      };
    case ActionTypes.PRODUCT_QUANTITY:
      const { id, value } = action.payload;

      const products = state.products.map((product) => {
        if (product.id !== id) return product;
        const updatedProduct = {
          ...product,
          quantity: Number(value),
        };
        return updatedProduct;
      });

      const newTotal = products.reduce((acc, current) => {
        return acc + current.quantity * current.price;
      }, 0);

      return {
        ...state,
        total: newTotal,
        products,
      };

    default:
      return state;
  }
};

export default reducer;
