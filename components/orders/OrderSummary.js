import { useContext, useState, useEffect } from "react";
import OrderContext from "../../context/orders/OrderContext";

import ProductSummary from "./ProductSummary";

const OrderSummary = () => {
  const {
    state: { products },
  } = useContext(OrderContext);

  return (
    <>
      <p className="p-2 my-2 mt-10 text-sm font-bold text-gray-700 bg-white border-l-4 border-gray-800">
        3- Ajusta las cantidades del producto
      </p>
      {products.length > 0 ? (
        products.map((product) => {
          return <ProductSummary key={product.id} product={product} />;
        })
      ) : (
        <p className="mt-5 text-sm">Aun no hay productos</p>
      )}
    </>
  );
};

export default OrderSummary;
