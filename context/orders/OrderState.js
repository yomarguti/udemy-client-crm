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

  return (
    <OrderContext.Provider value={{ state, addClient }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
