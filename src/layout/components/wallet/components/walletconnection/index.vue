<script setup lang="ts">
import { ref, watch } from "vue";
import { walletConnectProvider } from "@web3modal/wagmi";
import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/vue";
import { configureChains, createConfig } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { sendTransaction } from "@wagmi/core";
import { parseUnits } from "ethers";

const toAddress = ref("");
const amount = ref(""); // Allow user input for amount
const error = ref(null);
const transactionSuccess = ref(false); // Track transaction success
const lastTransactionHash = ref(""); // Track the transaction hash

// 1. Define constants
const projectId = "2c7be61ff62679a49304f7c6f1686b38";

// 2. Configure wagmi client
const { chains, publicClient } = configureChains(
  [sepolia],
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
// 4. Use modal composable
const modal = useWeb3Modal();

// 5. Add sendEth function
async function sendEth(toAddress: string) {
  try {
    const { hash } = await sendTransaction({
      to: toAddress,
      value: parseUnits(String(amount.value), 18) // Use the user-entered amount
    });

    transactionSuccess.value = true; // Mark transaction as successful
    error.value = null; // Clear any previous errors

    // Update the transaction hash
    lastTransactionHash.value = hash;

    window.alert("Transaction successful. Hash: " + hash);

    // Hide the success message after 5 seconds
    setTimeout(() => {
      transactionSuccess.value = false;

      // Clear the form
      toAddress = "";
      amount.value = "";
    }, 5000);

    return hash;
  } catch (error) {
    if (error.message === "User rejected methods") {
      // Handle the user rejection here, e.g., show a message to the user.
      console.error("User rejected the transaction.");
    } else {
      console.error("Error sending ETH:", error);
      error.value = "Error sending ETH: " + error.message;
    }
    throw error;
  }
}

const isConnected = ref(false);

async function openWeb3Modal() {
  try {
    await modal.open();
    isConnected.value = true;
    error.value = null; // Clear any previous errors
  } catch (error) {
    console.error("Error opening Web3Modal:", error);
    error.value = "User rejected or denied the request."; // Set an error message
    isConnected.value = false;
    // You can choose to show the error message to the user here
  }
}

function clearForm() {
  // Reset the form
  toAddress.value = "";
  amount.value = "";
  transactionSuccess.value = false; // Reset transaction success
}

watch(isConnected, newVal => {
  if (!newVal) {
    // Reset the form and hide the "Send ETH" button
    toAddress.value = "";
    amount.value = "";
    transactionSuccess.value = false; // Reset transaction success
  }
});
</script>

<template>
  <div>
    <!-- Button to open Web3Modal -->
    <button @click="openWeb3Modal()">WalletConnect</button>

    <!-- Display "Send ETH" button when connected -->
    <button
      v-if="isConnected && !transactionSuccess"
      @click="sendEth(toAddress)"
    >
      Send ETH
    </button>

    <!-- Display Send ETH form when connected and transaction is not successful -->
    <div v-if="isConnected && !transactionSuccess" class="sendEthBubble">
      <h2>Send ETH</h2>
      <input type="text" placeholder="To Address" v-model="toAddress" />
      <input type="number" placeholder="Amount" v-model="amount" />
      <button @click="sendEth(toAddress)">Send</button>
      <button @click="clearForm">Cancel</button>
    </div>

    <!-- Display success message when transaction is successful -->
    <div v-if="transactionSuccess" class="successMessage">
      Transaction successful! Your transaction hash is {{ lastTransactionHash }}
    </div>
  </div>
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
