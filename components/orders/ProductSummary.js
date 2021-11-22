import { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";

const ProductSummary = ({ product }) => {
  const { updateQuantity } = useContext(OrderContext);

  const { name, price, quantity } = product;

  const updateProduct = (value) => {
    updateQuantity(value, product.id);
  };

  return (
    <div className="mt-5 md:flex md:justify-between md:items-center">
      <div className="mb-2 md:w-2/4 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>$ {price}</p>
      </div>
      <input
        type="text"
        placeholder="cantidad"
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-inner md:ml-4"
        value={quantity || 0}
        onChange={(e) => updateProduct(e.target.value)}
      />
    </div>
  );
};

export default ProductSummary;
