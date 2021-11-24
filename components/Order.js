import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID) {
    deleteOrder(id: $id)
  }
`;

const GET_ORDERS_BY_SELLER = gql`
  query GetOrdersBySeller {
    getOrdersBySeller {
      id
      products {
        id
        quantity
      }
      total
      client {
        id
        name
        lastname
        company
        email
        phone
      }
      seller
      status
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrderStatus($id: ID, $input: OrderStatusInput) {
    updateOrderStatus(id: $id, input: $input) {
      status
    }
  }
`;

const getStatusClassName = (status) => {
  const statusStyles = {
    PENDING: "border-yellow-500",
    COMPLETED: "border-green-500",
    CANCELED: "border-red-800",
  };
  return statusStyles[status];
};

const Order = ({ order: { id, products, client, status, total } }) => {
  const router = useRouter();
  const [statusOrder, setStatusOrder] = useState(status);
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersBySeller } = cache.readQuery({
        query: GET_ORDERS_BY_SELLER,
      });
      cache.evict({ broadcast: false });
      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrdersBySeller: getOrdersBySeller.filter(
            (order) => order.id !== id
          ),
        },
      });
    },
  });

  const handleDeleteOrder = () => {
    Swal.fire({
      title: "Eliminar pedido",
      text: "Estas seguro de eliminar este pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const { data } = await deleteOrder({ variables: { id } });
          Swal.fire("Eliminado", data.deleteOrder, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleChangeStatus = async (newStatus) => {
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            client: client.id,
            status: newStatus,
          },
        },
      });
      setStatusOrder(data.updateOrderStatus.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${getStatusClassName(
        statusOrder
      )} border-t-4 p-6 mt-4 bg-white rounded shadow-lg md:grid md:grid-cols-2 md:gap-4`}
    >
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {`${client.name} ${client.lastname}`}
        </p>
        <p className="font-bold text-gray-800">{client.company}</p>
        {client.email && (
          <p className="flex items-center my-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            {client.email}
          </p>
        )}
        {client.phone && (
          <p className="flex items-center my-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            {client.phone}
          </p>
        )}
        <h2 className="mt-10 font-bold text-gray-800">Estado pedido</h2>
        <select
          value={statusOrder}
          onChange={(e) => handleChangeStatus(e.target.value)}
          className="p-2 mt-2 text-sm leading-tight text-center text-white uppercase bg-blue-600 border border-blue-600 rounded appearance-none focus:outline-none focus:border-blue-500 focus:bg-blue-600"
        >
          <option value="COMPLETED">COMPLETADO</option>
          <option value="PENDING">PENDIENTE</option>
          <option value="CANCELED">CANCELADO</option>
        </select>
      </div>
      <div>
        <h2 className="font-bold text-gray-800">Resumen del pedido</h2>
        {products.map(({ id, name, quantity }) => {
          return (
            <div key={id} className="mt-4">
              <p className="text-sm text-gray-600">Producto: {name}</p>
              <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
            </div>
          );
        })}
        <p className="mt-3 font-bold text-gray-800">Total a pagar</p>
        <span className="font-light">$ {total}</span>
        <button
          type="button"
          className="flex items-center px-5 py-2 mt-2 text-xs font-bold text-white uppercase bg-red-800 rounded"
          onClick={handleDeleteOrder}
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
      </div>
    </div>
  );
};

export default Order;
