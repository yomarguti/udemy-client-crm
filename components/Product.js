import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const DELETE_PRODUCT = gql`
  mutation Mutation($id: ID) {
    deleteProduct(id: $id)
  }
`;

const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      id
      name
      stock
      price
      createdAt
    }
  }
`;

const Product = ({ product: { id, name, stock, price } }) => {
  const router = useRouter();
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });
      cache.evict({ broadcast: false });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter((product) => product.id !== id),
        },
      });
    },
  });

  const handleDeleteProduct = () => {
    Swal.fire({
      title: "Eliminar Producto",
      text: "Estas seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const { data } = await deleteProduct({ variables: { id } });
          Swal.fire("Eliminado", data.deleteProduct, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleEditProduct = () => {
    router.push({
      pathname: "/edit-product/[id]",
      query: { id },
    });
  };

  return (
    <tr>
      <td className="px-4 py-2 border border-gray-300">{name}</td>
      <td className="px-4 py-2 border border-gray-300">{stock}</td>
      <td className="px-4 py-2 border border-gray-300">$ {price}</td>
      <td className="px-4 py-2 border border-gray-300">
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 font-bold text-white uppercase bg-red-800 rounded"
          onClick={handleDeleteProduct}
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
          onClick={handleEditProduct}
        >
          Editar
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Product;
