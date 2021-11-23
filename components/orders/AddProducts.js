import { useContext, useState, useEffect } from "react";
import OrderContext from "../../context/orders/OrderContext";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      id
      name
      stock
      price
    }
  }
`;

const AddProducts = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const { addProducts, state } = useContext(OrderContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    addProducts(products);
  }, [products]);

  const selectProduct = (products) => {
    setProducts(products);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p className="p-2 my-2 mt-10 text-sm font-bold text-gray-700 bg-white border-l-4 border-gray-800">
        2- Asigna productos al pedido
      </p>
      <Select
        isMulti
        className="mt-3"
        options={data?.getProducts}
        onChange={(products) => selectProduct(products)}
        getOptionValue={(product) => product.id}
        getOptionLabel={(product) =>
          `${product.name} (${product.stock} disponibles)`
        }
        placeholder="Seleccione productos"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AddProducts;
