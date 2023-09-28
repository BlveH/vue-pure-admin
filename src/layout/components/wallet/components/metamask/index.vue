<template>
  <div>
    <button
      id="connectAndRequestPermissionsButton"
      class="connectToMetaMaskButton"
      v-show="!isConnected"
      @click="connectAndRequestPermissions"
    >
      Metamask
    </button>

    <div v-if="showAccountInfo">
      <account-bubble
        :account="account"
        :balance="balance"
        :draggable="true"
        :position="{ top: 50, left: 50 }"
      />
    </div>

    <button
      class="openAccountBubbleButton"
      v-show="!showAccountInfo && isConnected"
      @click="showBubble"
    >
      Account
    </button>

    <button
      class="closeAccountBubbleButton"
      v-show="showAccountInfo"
      @click="unShowBubble"
    >
      Close
    </button>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import AccountBubble from "./accountBubble.vue";
import { Buffer } from "buffer";

async function siweSign(account) {
  const domain = window.location.host;
  const from = account;
  const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2023-09-28T10:26:48.000Z`;
  const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`;
  try {
    // Sign the data with the user's Ethereum account.
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [msg, from]
    });
    return signature;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export default {
  name: "App",
  components: {
    AccountBubble
  },
  data() {
    return {
      account: null,
      currentAccount: null,
      balance: null,
      showAccountInfo: false,
      isConnected: false,
      siweResult: ""
    };
  },
  mounted() {
    onMounted(() => {
      if (window.ethereum) {
        this.connectToMetaMask();
      } else {
        console.log("Please install MetaMask.");
      }
    });
    document
      .getElementById("connectAndRequestPermissionsButton")
      .addEventListener("click", this.requestPermissions);
  },
  methods: {
    async connectAndRequestPermissions() {
      try {
        // Request the user to switch to the BNB Smart Chain network.
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }]
        });

        // Get the account balance.
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0]]
        });

        // Sign the data with the user's Ethereum account.
        const signature = await siweSign(accounts[0]);

        // If the user signed the data successfully, set the connection status to true.
        if (signature) {
          this.isConnected = true;
        }

        // Update the app state.
        this.account = accounts[0];
        this.balance = balance;

        // Show the signature to the user.
        this.siweResult = signature;
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            // Add the BNB Smart Chain network to MetaMask.
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  chainName: "BNB Smart Chain",
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                  }
                }
              ]
            });
          } catch (addError) {
            console.error(addError);
          }
        } else {
          console.error(switchError);
        }
      }
      // Disconnect the user if the network changes.
      window.ethereum.on("chainChanged", () => {
        this.isConnected = false;
        this.account = null;
        this.balance = null;
      });
    },
    async showBubble() {
      try {
        // Show the account information.
        this.showAccountInfo = true;
      } catch (err) {
        console.error(err);
      }
    },
    async unShowBubble() {
      try {
        // Show the account information.
        this.showAccountInfo = false;
      } catch (err) {
        console.error(err);
      }
    },
    async requestPermissions() {
      try {
        const permissions = await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }]
        });

        const accountsPermission = permissions.find(
          permission => permission.parentCapability === "eth_accounts"
        );

        if (accountsPermission) {
          console.log("eth_accounts permission successfully requested!");
        }
      } catch (error) {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Permissions needed to continue.");
        } else {
          console.error(error);
        }
      }
    }
  }
};
</script>

<style scoped>
button {
  --color: #0077ff;
  font-family: inherit;
  display: inline-block;
  width: 6em;
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

.account-bubble {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  cursor: move;
}
</style>
