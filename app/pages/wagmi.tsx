import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { Field, Button } from "../components/forms";

import { useAccount, useProvider, useConnect, useDisconnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Wagmi = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { chain: _chain, chains: _chains } = useNetwork();
  const _provider = useProvider();
  const { address, connector, isConnected } = useAccount();
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

  // TEST
  console.log("isConnected: ", isConnected);
  console.log("Chain: ", _chain);
  console.log("Chains: ", _chains);
  console.log("Provider: ", _provider);
  console.log("Connector: ", connector);
  console.log("Address: ", address);

  console.log("Error: ", error);
  console.log("isLoading: ", isLoading);
  console.log("Connectors: ", connectors);
  console.log("pendingConnector: ", pendingConnector);
  if (_provider) {
    _provider.getBlockNumber().then(console.log);
  }
  // TEST

  const handleConnect = (event: FormEvent) => {
    event.preventDefault();
    console.log(isConnected ? "Disconnecting..." : "Connecting...");
    isConnected ? disconnect() : connect();
  };

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
            <div className="text-sm text-gray-90">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <p className="inline">
                    <span className="underline">Chain:</span>
                    <span className="text-gray-700 ml-2">
                      (wagmi/chains). mainnet, polygonMumbai, hardhat, localhost ...
                    </span>
                  </p>
                </li>
                <li>
                  <p className="inline">
                    <span className="underline">Provider:</span>
                  </p>
                  <ul className="ml-5 list-disc list-inside text-gray-700">
                    <li>
                      wagmi (wagmi/provides/[provider]). Ether connectors that include chain info:
                      <ul className="ml-10 list-disc list-inside">
                        <li>alchemyProvider, infuraProvider, jsonRpcProvider</li>
                        <li>publicProvider(ethers StaticJsonRpcProvider): Currently pointing to Cloudflare.</li>
                      </ul>
                    </li>
                    <li>
                      Ethers.js:
                      <ul className="ml-10 list-disc list-inside">
                        <li>Web3Provider, EtherscanProvider ...</li>
                        <li>getDefaultProvider() (ethers FallbackProvider).</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="inline">
                    <span className="underline">Client:</span>
                    <span className="text-gray-700 ml-2">
                      (createClient) wagmi Provider + optional Connection. Sets auto-connect. Passed to WagmiConfig.
                    </span>
                  </p>
                </li>
                <li>
                  <p className="inline">
                    <span className="underline">Connection:</span>
                    <span className="text-gray-700 ml-2">InjectedConnector, CoinbaseWalletConnector …</span>
                  </p>
                </li>
              </ul>
            </div>
            <div className="bg-white mt-8 p-8 shadow rounded-lg md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
              </div>
              <div className="shadow bg-gray-100 md:col-span-3 sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 p-5">
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
