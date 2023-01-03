import { createClient, configureChains } from "wagmi";
import { mainnet, goerli, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { getDefaultProvider } from "ethers";

const { chains, provider, webSocketProvider } = configureChains([mainnet, hardhat, goerli], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default client;
