import { useContext, useState, useEffect } from "react";
import OrderContext from "../../context/orders/OrderContext";

const ProductSummary = ({ product }) => {
  const { updateQuantity } = useContext(OrderContext);
  console.log("Product: ", product);

  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    addQuantity();
  }, [quantity]);

  const addQuantity = () => {
    const updatedProduct = { ...product, quantity: Number(quantity) };
    updateQuantity(updatedProduct);
  };

  const { name, price } = product;

  return (
    <div className="mt-5 md:flex md:justify-between md:items-center">
      <div className="mb-2 md:w-2/4 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>$ {price}</p>
      </div>
      <input
        type="number"
        placeholder="cantidad"
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-inner md:ml-4"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
  );
};

export default ProductSummary;
