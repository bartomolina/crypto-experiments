import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import { Field, Button } from "../components/forms";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import { useAccount, useProvider, useConnect, useDisconnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Wagmi = () => {
  const { data: topic } = useSWR("/api/markdown/wagmi", fetcher);
  const [hasMounted, setHasMounted] = useState(false);
  const provider = useProvider();
  const { address, connector, isConnected } = useAccount();
  const { chains, chain } = useNetwork();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // To prevent hydration errors:
  // https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const handleConnect = (event: FormEvent) => {
    event.preventDefault();
    isConnected ? disconnect() : connect();
  };

  // Logs
  // console.log(topic);
  // console.log("isConnected: ", isConnected);
  // console.log("Provider: ", provider);
  // console.log("Connector: ", connector);
  // console.log("Chains:", chains);
  // console.log("Chain:", chain);
  // console.log("Address: ", address);
  // console.log("Error: ", error);
  // console.log("isLoading: ", isLoading);
  // console.log("Connectors: ", connectors);
  // console.log("pendingConnector: ", pendingConnector);
  // if (provider) {
  //   provider.getBlockNumber().then(console.log);
  // }
  // End Logs

  return (
    <>
      <Head>
        <title>wagmi - Crypto experiments</title>
        <meta name="description" content="wagmi" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <header>
            <h1 className="text-3xl font-semibold space-y-3">wagmi</h1>
          </header>
          <main className="pt-8">
            <div className="markdown">
              <div className="text-sm text-gray-90" dangerouslySetInnerHTML={{ __html: topic?.html }} />
            </div>
            <div className="bg-white mt-8 p-8 shadow rounded-lg md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
              </div>
              <div className="shadow bg-gray-100 md:col-span-3 sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 p-5">
                  <Button
                    disabled={isLoading}
                    text={isLoading ? "Connecting..." : isConnected ? "Disconnect" : "Connect"}
                    clickAction={handleConnect}
                  ></Button>
                  <Field label="IsConnected" text={isConnected.toString()} type="details" />
                  <Field label="Address" text={address ? address : "Not connected"} type="details" />
                  <Field label="Network" text={chain ? chain.name : "Not connected"} type="details" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Wagmi;
