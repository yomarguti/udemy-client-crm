import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import AttachClient from "../components/orders/AttachClient";

const newOrder = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Nuevo Pedido</h1>
        <AttachClient />
      </Layout>
    </div>
  );
};

export default newOrder;
