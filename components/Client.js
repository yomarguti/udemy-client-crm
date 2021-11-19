import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID) {
    deleteClient(id: $id)
  }
`;

const GET_CLIENTS_BY_SELLER = gql`
  query GetClientsBySeller {
    getClientsBySeller {
      id
      name
      lastname
      email
      company
      phone
      createdAt
      sellerId
    }
  }
`;

const Client = ({ client: { id, name, lastname, company, email } }) => {
  const router = useRouter();
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { getClientsBySeller } = cache.readQuery({
        query: GET_CLIENTS_BY_SELLER,
      });

      cache.writeQuery({
        query: GET_CLIENTS_BY_SELLER,
        data: {
          getClientsBySeller: getClientsBySeller.filter(
            (client) => client.id !== id
          ),
        },
      });
    },
  });

  const handleDeleteClient = () => {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "Estas seguro de eliminar este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      try {
        const { data } = await deleteClient({ variables: { id } });
        Swal.fire("Eliminado", data.deleteClient, "success");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleEditClient = () => {
    router.push({
      pathname: "/edit-client/[id]",
      query: { id },
    });
  };

  return (
    <tr>
      <td className="px-4 py-2 border border-gray-300">{`${name} ${lastname}`}</td>
      <td className="px-4 py-2 border border-gray-300">{company}</td>
      <td className="px-4 py-2 border border-gray-300">{email}</td>
      <td className="px-4 py-2 border border-gray-300">
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 font-bold text-white uppercase bg-red-800 rounded"
          onClick={handleDeleteClient}
        >
          Eliminar
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </td>
      <td className="px-4 py-2 border border-gray-300">
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 font-bold text-white uppercase bg-green-600 rounded"
          onClick={handleEditClient}
        >
          Editar
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;
