import { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const TotalOrder = () => {
  const {
    state: { products },
  } = useContext(OrderContext);

  let total = 0;
  console.log("Products: ", products);

  if (products.length > 0) {
    total = products.reduce((acc, current) => {
      const quantity = current.quantity || 0;
      return acc + quantity * current.price;
    }, 0);
  }

  return (
    <div className="flex items-center justify-between p-3 mt-5 bg-white ">
      <h2 className="text-lg text-gray-800">Total a pagar: </h2>
      <p className="mt-0 text-gray-800">$ {total}</p>
    </div>
  );
};

export default TotalOrder;
