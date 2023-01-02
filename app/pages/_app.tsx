import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

import { WagmiConfig } from "wagmi";
import client from "../lib/wagmi";

const App = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={client}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </WagmiConfig>
);

export default App;
