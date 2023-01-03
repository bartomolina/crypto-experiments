import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { Field, Button, Dropdown } from "../components/forms";

import { ethers } from "ethers";
import { getDefaultProvider, BaseProvider, Web3Provider, Network, JsonRpcSigner } from "@ethersproject/providers";

const providers = ["Default Provider", ""];
const networks = [];

const Ethers = () => {
  const [provider, setProvider] = useState<Web3Provider | BaseProvider | undefined>();
  const [network, setNetwork] = useState<Network>();
  const [blockNumber, setBlockNumber] = useState<number>();
  const [address, setAddress] = useState<string>();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [ethPrice, setEthPrice] = useState<number | string>();

  useEffect(() => {
    try {
      console.log("Connecting to provider...");
      if (!window.ethereum) return;
      const _provider = new Web3Provider(window.ethereum, "any");
      // const _provider = getDefaultProvider("goerli", { alchemy: "" });
      _provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
      setProvider(_provider);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(provider);
    provider?.getNetwork().then((network) => {
      setNetwork(network);
    });
    provider?.getBlockNumber().then((blockNumber) => {
      setBlockNumber(blockNumber);
    });
    if (provider && "listAccounts" in provider) {
      provider?.listAccounts().then((accounts) => {
        setAddress(accounts[0]);
        console.log(accounts);
      });
    }
    if (provider && "getEtherPrice" in provider) {
      provider?.getEtherPrice().then(
        (price) => {
          setEthPrice(price);
        },
        (err) => {
          setEthPrice(err.code);
        }
      );
    }
    if (provider && "getSigner" in provider) {
      setSigner(provider?.getSigner());
    }
  }, [provider]);

  const handleGetAddress = (event: FormEvent) => {
    event.preventDefault();
    console.log("Getting address...");
    console.log(provider?._network.name);
    console.log(network);

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log(provider);
    // //provider.send("eth_requestAccounts", []).then(console.log);
    // const signer = provider.getSigner();
    // console.log("Signer: ", signer);
  };

  return (
    <>
      <Head>
        <title>Ethers.js - Crypto experiments</title>
        <meta name="description" content="Ethers.js" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <header>
            <h1 className="text-3xl font-semibold space-y-3">Ethers.js</h1>
          </header>
          <main className="pt-10">
            <div className="bg-white p-8 shadow rounded-lg md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
              </div>
              <div className="shadow bg-gray-100 md:col-span-3 sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 p-5">
                  <Dropdown label="Provider" options={["Web3", "RPC"]} />
                  <Button text={provider ? "Disconnect" : "Connect"} clickAction={handleGetAddress}></Button>
                  {/* <Field
                    label="Provider URL ➡️ provider.connection.url"
                    text={provider ? provider.connection.url : "Not connected / Not available"}
                    type="details"
                  /> */}
                  <Field
                    label="Network name ➡️ provider.getNetwork().name"
                    text={network ? network.name : "Not connected"}
                    type="details"
                  />
                  <Field
                    label="Block number ➡️ provider.getBlockNumber()"
                    text={blockNumber ? blockNumber.toString() : "Not connected"}
                    type="details"
                  />
                  <Field
                    label="Address ➡️ provider.listAccounts()"
                    text={address ? address : "Not connected"}
                    type="details"
                  />
                  <Field
                    label="ETH Price ➡️ provider.listAccounts()"
                    text={ethPrice ? ethPrice.toString() : "Not connected"}
                    type="details"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Ethers;
