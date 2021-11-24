import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import router from "next/router";

import Layout from "../components/Layout";
import Order from "../components/Order";

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

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS_BY_SELLER);

  if (loading) {
    return (
      <div>
        <Layout>
          <p>Loading...</p>
        </Layout>
      </div>
    );
  }

  if (!data) {
    router.push("/login");
    return <p>No data</p>;
  }

  const { getOrdersBySeller } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Pedidos</h1>
        <Link href="/new-order">
          <a className="inline-block px-5 py-2 mt-5 mb-3 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-gray-800">
            Nuevo Pedido
          </a>
        </Link>
        {getOrdersBySeller.length === 0 ? (
          <p className="mt-5 text-2xl text-center">
            Noy hay pedidos que mostrar
          </p>
        ) : (
          getOrdersBySeller.map((order) => (
            <Order key={order.id} order={order} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default Orders;
