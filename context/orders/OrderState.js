import { useReducer } from "react";
import OrderContext from "./OrderContext";
import * as ActionTypes from "../../types";
import orderReducer from "./OrderReducer";

const OrderState = ({ children }) => {
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addClient = (client) => {
    dispatch({ type: ActionTypes.SELECT_CLIENT, payload: client });
  };

  const addProducts = (products) => {
    dispatch({ type: ActionTypes.SELECT_PRODUCT, payload: products });
  };

  const updateQuantity = (value, id) => {
    dispatch({ type: ActionTypes.PRODUCT_QUANTITY, payload: { value, id } });
  };

  return (
    <OrderContext.Provider
      value={{ state, addClient, addProducts, updateQuantity }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
