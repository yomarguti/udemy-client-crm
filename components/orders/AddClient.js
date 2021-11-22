import { useContext } from "react";
import OrderContext from "../../context/orders/OrderContext";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS_BY_SELLER = gql`
  query GetClientsBySeller {
    getClientsBySeller {
      id
      name
      lastname
      email
      company
      phone
      sellerId
    }
  }
`;

const AttachClient = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_SELLER);
  const { addClient } = useContext(OrderContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p className="p-2 my-2 mt-10 text-sm font-bold text-gray-700 bg-white border-l-4 border-gray-800">
        1- Asigna un cliente al pedido
      </p>
      <Select
        className="mt-3"
        options={data?.getClientsBySeller}
        onChange={(client) => addClient(client)}
        getOptionValue={(client) => client.id}
        getOptionLabel={(client) => `${client.name} ${client.lastname}`}
        placeholder="Seleccione un cliente"
        noOptionsMessage="No hay resultados"
      />
    </>
  );
};

export default AttachClient;
