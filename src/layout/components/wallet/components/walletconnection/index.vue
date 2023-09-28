<script setup lang="ts">
import { walletConnectProvider } from "@web3modal/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/vue";

import { configureChains, createConfig } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { InjectedConnector } from "@wagmi/core";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { useWeb3Modal } from "@web3modal/wagmi/vue";

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
    }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
  ],
  publicClient
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

const modal = useWeb3Modal();
</script>

<template>
  <button @click="modal.open({ view: 'Networks' })">Open Network Modal</button>
</template>
