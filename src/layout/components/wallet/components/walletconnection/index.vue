<script setup lang="ts">
import { walletConnectProvider } from "@web3modal/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/vue";

import { configureChains, createConfig } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";

// 1. Define constants
const projectId = "2c7be61ff62679a49304f7c6f1686b38";

// 2. Configure wagmi client
const { chains, publicClient } = configureChains(
  [bsc],
  [walletConnectProvider({ projectId }), publicProvider()]
);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata }
    })
  ],
  publicClient
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });
</script>

<template>
  <w3m-button />
</template>

<style>
button {
  --color: #0077ff;
  font-family: inherit;
  display: inline-block;
  width: 10em;
  height: 2.6em;
  line-height: 2.5em;
  overflow: hidden;
  margin: 20px;
  font-size: 17px;
  z-index: 1;
  color: var(--color);
  border: 2px solid var(--color);
  border-radius: 6px;
  position: relative;
}

button::before {
  position: absolute;
  content: "";
  background: var(--color);
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
}

button:hover {
  color: white;
}

button:before {
  top: 100%;
  left: 100%;
  transition: 0.3s all;
}

button:hover::before {
  top: -30px;
  left: -30px;
}
</style>
