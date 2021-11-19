import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import OrderState from "../context/orders/OrderState";

import client from "../config/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  );
}

export default MyApp;
