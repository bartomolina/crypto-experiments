import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import { Field, Button } from "../components/forms";
import { LinkIcon } from "@heroicons/react/24/solid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import { useProvider, useConnect, useDisconnect, useAccount, useNetwork, useBalance, useBlockNumber } from "wagmi";
import { Provider } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

type LatestBlocksParams = {
  provider: Provider;
};
const fetchLatestBlock = ({ provider }: LatestBlocksParams) => provider.getBlockNumber();

const Wagmi = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { data: topic } = useSWR("/api/markdown/wagmi", fetcher);

  const provider = useProvider();
  const { data: latestBlock } = useSWR({ key: "latestBlock", provider }, fetchLatestBlock);

  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({ address });

  const handleConnect = (event: FormEvent) => {
    event.preventDefault();
    isConnected ? disconnect() : connect();
  };

  // Logs
  // console.log(topic);
  // console.log(provider);
  // console.log("isLoading: ", isLoading);
  // console.log("isConnected: ", isConnected);
  // console.log("Address: ", address);
  // console.log("Balance: ", balance);
  // console.log("Chain:", chain);
  // End Logs

  // To prevent hydration errors:
  // https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, []);
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>wagmi - Crypto experiments</title>
        <meta name="description" content="wagmi" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <header>
            <h1 className="text-3xl font-semibold space-y-3">
              wagmi
              <a href="https://wagmi.sh/" target="_blank" rel="noopener noreferrer">
                <LinkIcon className="h-5 w-5 ml-2 inline" />
              </a>
            </h1>
          </header>
          <main className="pt-8">
            <div className="markdown">
              <div className="text-sm text-gray-90" dangerouslySetInnerHTML={{ __html: topic?.html }} />
            </div>
            <div className="bg-white mt-8 p-8 shadow rounded-lg">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900">Provider</h3>
                </div>
                <div className="shadow bg-gray-100 md:col-span-3 sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 p-5">
                    <Field
                      label="Latest Block"
                      text={typeof latestBlock !== "undefined" ? latestBlock.toString() : "N/A"}
                      type="details"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-4 md:gap-6">
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
                    <Field label="Address" text={address ? address : "N/A"} type="details" />
                    <Field label="Balance" text={balance ? `${balance.formatted} ${balance.symbol}` : "N/A"} type="details" />
                    <Field label="Network" text={chain ? chain.name : "N/A"} type="details" />
                  </div>
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
