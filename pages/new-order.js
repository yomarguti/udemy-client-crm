import { useContext, useState } from "react";
import OrderContext from "../context/orders/OrderContext";
import { useRouter } from "next/router";

import { useMutation, gql } from "@apollo/client";

import Layout from "../components/Layout";
import AddClient from "../components/orders/AddClient";
import AddProducts from "../components/orders/AddProducts";
import OrderSummary from "../components/orders/OrderSummary";
import TotalOrder from "../components/orders/TotalOrder";

const NEW_ORDER = gql`
  mutation NewOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

const GET_ORDERS_BY_SELLER = gql`
  query GetOrdersBySeller {
    getOrdersBySeller {
      id
      products {
        id
        quantity
        name
        price
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
      createdAt
      status
    }
  }
`;
const newOrder = () => {
  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getOrdersBySeller } = cache.readQuery({
        query: GET_ORDERS_BY_SELLER,
      });
      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrdersBySeller: [...getOrdersBySeller, newOrder],
        },
      });
    },
  });
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const {
    state: { client, products, total },
  } = useContext(OrderContext);

  const isOrderValid = () => {
    return Object.keys(client).length !== 0 && products.length > 0 && total > 0;
  };

  const handleNewClient = async () => {
    try {
      const productsInOrder = products.map(({ id, quantity, name, price }) => {
        return {
          id,
          quantity,
          name,
          price,
        };
      });

      const { data } = await newOrder({
        variables: {
          input: {
            client: client.id,
            total,
            products: productsInOrder,
          },
        },
      });
      setMessage("Orden creada correctamente");
      setTimeout(() => {
        setMessage(null);
        router.push("/orders");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Nuevo Pedido</h1>
        {message ? (
          <div className="w-full max-w-sm px-3 py-2 mx-auto my-3 text-center bg-white">
            <p>{message}</p>
          </div>
        ) : null}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <AddClient />
            <AddProducts />
            <OrderSummary />
            <TotalOrder />
            <button
              type="button"
              className={`w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900 ${
                isOrderValid() ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleNewClient}
            >
              Crear Orden
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default newOrder;
