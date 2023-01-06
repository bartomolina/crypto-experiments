import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import { Field, Button } from "../components/forms";
import { LinkIcon } from "@heroicons/react/24/solid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import {
  useProvider,
  useConnect,
  useDisconnect,
  useAccount,
  useNetwork,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { Provider, readContract } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const readContractFunction = "readMessage";
const writeContractFunction = "setMessage";
import { abi } from "../lib/constants";

type LatestBlocksParams = {
  provider: Provider;
};
const fetchLatestBlock = ({ provider }: LatestBlocksParams) => provider.getBlockNumber();

const Wagmi = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { data: topic } = useSWR("/api/markdown/wagmi", fetcher);

  const provider = useProvider();
  const { data: latestBlock } = useSWR({ key: "latestBlock", provider }, fetchLatestBlock);
  const [contractReadForm, setContractReadForm] = useState<{
    ContractaddressCore: `0x${string}`;
    ContractfunctionCore: string;
    Contractresponse: string;
  }>({
    ContractaddressCore: contractAddress,
    ContractfunctionCore: readContractFunction,
    Contractresponse: "",
  });
  const [contractWriteParam, setContractWriteParam] = useState("");

  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useNetwork();
  const { data: readContractData } = useContractRead({
    address: contractAddress,
    abi,
    functionName: readContractFunction,
  });
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: writeContractFunction,
    args: [contractWriteParam],
  });
  const {
    data: writeContractData,
    isLoading: writeContractLoading,
    isSuccess: writeContractSuccess,
    write,
  } = useContractWrite(config);

  const handleConnect = (event: FormEvent) => {
    event.preventDefault();
    isConnected ? disconnect() : connect();
  };

  const handleContractReadUpdate = (event: FormEvent<HTMLInputElement>) => {
    setContractReadForm({
      ...contractReadForm,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleContractRead = (event: FormEvent) => {
    event.preventDefault();
    readContract({
      address: contractReadForm.ContractaddressCore,
      abi,
      functionName: contractReadForm.ContractfunctionCore,
    }).then((data) => {
      setContractReadForm({
        ...contractReadForm,
        Contractresponse: data as string,
      });
    });
  };

  const handleContractWriteUpdate = (event: FormEvent<HTMLInputElement>) => {
    setContractWriteParam(event.currentTarget.value);
  };

  const handleContractWrite = (event: FormEvent) => {
    event.preventDefault();
    if (write) {
      write();
    }
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
  }, [hasMounted]);
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>wagmi - Crypto experiments</title>
        <meta name="description" content="wagmi" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
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
            <div className="bg-white mt-8 md:p-8 p-4 shadow rounded-lg space-y-4 md:space-y-0">
              <div className="md:grid md:grid-cols-4 md:gap-6 space-y-4 md:space-y-0">
                <div className="md:col-span-1 md:mt-0">
                  <h3 className="text-lg font-semibold text-gray-900">Provider</h3>
                  <div className="text-xs text-gray-400">
                    <p>useProvider getBlockNumber /</p>
                    <p>useBlockNumber</p>
                  </div>
                </div>
                <div className="shadow bg-gray-100 md:col-span-3 sm:rounded-md">
                  <div className="space-y-3 md:px-5 md:py-4 p-3">
                    <Field
                      label="Latest Block"
                      text={typeof latestBlock !== "undefined" ? latestBlock.toString() : "N/A"}
                      type="details"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-4 md:gap-6 space-y-4 md:space-y-0">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
                  <div className="text-xs text-gray-400">
                    <p>useConnect</p>
                    <p>useAccount</p>
                    <p>useBalance</p>
                    <p>useNetwork</p>
                  </div>
                </div>
                <div className="shadow bg-gray-100 md:col-span-3 sm:rounded-md">
                  <div className="space-y-3 md:px-5 md:py-4 p-3">
                    <Button
                      disabled={isLoading}
                      text={isLoading ? "Connecting..." : isConnected ? "Disconnect" : "Connect"}
                      clickAction={handleConnect}
                    ></Button>
                    <Field label="IsConnected" text={isConnected.toString()} type="details" />
                    <Field label="Address" text={address ? address : "N/A"} type="details" />
                    <Field
                      label="Balance"
                      text={balance ? `${balance.formatted} ${balance.symbol}` : "N/A"}
                      type="details"
                    />
                    <Field label="Network" text={chain ? chain.name : "N/A"} type="details" />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-4 md:gap-6 space-y-4 md:space-y-0">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900">Contract read</h3>
                  <div className="text-xs text-gray-400">
                    <p>useContractRead</p>
                    <p>readContract</p>
                  </div>
                </div>
                <div className="shadow bg-gray-100 md:col-span-3 sm:rounded-md">
                  <div className="space-y-3 md:px-5 md:py-4 p-3">
                    <Field label="Contract address (Hook)" text={contractAddress} type="details" />
                    <Field label="Contract function (Hook)" text={readContractFunction} type="details" />
                    <Field
                      label="Result"
                      text={readContractData ? readContractData.toString() : "N/A"}
                      type="details"
                    />
                    <form onSubmit={handleContractRead} className="space-y-4">
                      <Field
                        label="Contract address (Core)"
                        text={contractReadForm.ContractaddressCore}
                        changeAction={handleContractReadUpdate}
                      />
                      <Field
                        label="Contract function (Core)"
                        text={contractReadForm.ContractfunctionCore}
                        changeAction={handleContractReadUpdate}
                      />
                      <Button text={"Read contract"} type="submit"></Button>
                    </form>
                    <Field
                      label="Result (Core)"
                      text={contractReadForm?.Contractresponse ? contractReadForm.Contractresponse : "N/A"}
                      type="details"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-4 md:gap-6 space-y-4 md:space-y-0">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900">Contract write</h3>
                  <div className="text-xs text-gray-400">
                    <p>useContractWrite</p>
                    <p>readContract</p>
                  </div>
                </div>
                <div className="shadow bg-gray-100 md:col-span-3 sm:rounded-md">
                  <div className="px-5 py-4 space-y-3">
                    <form onSubmit={handleContractWrite} className="space-y-4">
                      <Field
                        label="Contract write"
                        text={contractWriteParam}
                        changeAction={handleContractWriteUpdate}
                      />
                      <Button
                        disabled={writeContractLoading}
                        text={writeContractLoading ? "Writting..." : "Write contract"}
                        type="submit"
                      ></Button>
                    </form>
                    <Field
                      label="Transaction"
                      text={writeContractData?.hash ? writeContractData.hash : "N/A"}
                      type="details"
                    />
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
