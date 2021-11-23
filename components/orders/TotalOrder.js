import { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const TotalOrder = () => {
  const { state } = useContext(OrderContext);

  return (
    <div className="flex items-center justify-between p-3 mt-5 bg-white ">
      <h2 className="text-lg text-gray-800">Total a pagar: </h2>
      <p className="mt-0 text-gray-800">$ {state.total}</p>
    </div>
  );
};

export default TotalOrder;
