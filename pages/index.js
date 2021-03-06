import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import router from "next/router";

import Layout from "../components/Layout";
import Client from "../components/Client";

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

const Home = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_SELLER);

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

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Clients</h1>
        <Link href="/new-client">
          <a className="inline-block px-5 py-2 mt-5 mb-3 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-gray-800">
            Nuevo Cliente
          </a>
        </Link>
        <table className="w-full mt-10 shadow-md table-auto w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data?.getClientsBySeller.map((client) => {
              return <Client key={client.id} client={client} />;
            })}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Home;
