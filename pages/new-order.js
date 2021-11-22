import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import AddClient from "../components/orders/AddClient";
import AddProducts from "../components/orders/AddProducts";
import OrderSummary from "../components/orders/OrderSummary";
import TotalOrder from "../components/orders/TotalOrder";

const newOrder = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Nuevo Pedido</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <AddClient />
            <AddProducts />
            <OrderSummary />
            <TotalOrder />
            <button
              type="button"
              className="w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900"
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
