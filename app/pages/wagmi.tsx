import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { Button, Field } from "../components/forms";

import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Wagmi = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { address, connector, isConnected } = useAccount();
  const {
    connect,
    connectors,
    error: connectionError,
    isLoading,
    pendingConnector,
  } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const handleConnect = (event: FormEvent) => {
    event.preventDefault();
    console.log(isConnected ? "Disconnecting" : "Connecting");
    // console.log("Supported: ", chain?.unsupported);
    isConnected ? disconnect() : connect();
  };

  // To prevent hydration errors:
  // https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>WAGMI - Home</title>
        <meta name="description" content="WAGMI" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <header>
            <h1 className="text-3xl font-semibold space-y-3">wagmi</h1>
          </header>
          <main className="pt-10">
            <div className="bg-white p-8 shadow rounded-lg md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
              </div>
              <div className="shadow bg-gray-100 md:col-span-3 sm:overflow-hidden sm:rounded-md">
                <div className="space-y-4 p-5">
                  <Button text={isConnected ? "Disconnect" : "Connect"} clickAction={handleConnect}></Button>
                  <Field label="IsConnected" text={isConnected.toString()} type="details" />
                  <Field label="Address" text={address ? address : "Not connected"} type="details" />
                  <Field label="Network" text="Network" />
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
