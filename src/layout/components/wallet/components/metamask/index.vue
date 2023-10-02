<template>
  <div>
    <button
      class="connectToMetaMaskButton"
      v-show="!isConnected"
      @click="connect"
    >
      Metamask
    </button>

    <div v-if="showAccountInfo">
      <account-bubble
        :account="account"
        :balance="balance"
        :draggable="true"
        @logout="onLogout"
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
      class="sendEthButton btn"
      v-show="isConnected"
      @click="showSendEthBubble = true"
    >
      Send ETH
    </button>
    <div v-if="showSendEthBubble">
      <div class="sendEthBubble">
        <h2>Send ETH</h2>
        <input type="text" placeholder="To Address" v-model="toAddress" />
        <input type="number" placeholder="Amount" v-model.number="amount" />
        <button @click="sendEth">Send</button>
        <button @click="closeSendEthBubble">Cancel</button>
      </div>
      <div v-if="transactionSuccess" class="transaction-success">
        Transaction successful!
      </div>
    </div>

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

const ethereum: any = window.ethereum;

async function siweSign(account: any) {
  const domain = window.location.host;
  const from = account;
  const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2023-09-28T10:26:48.000Z`;
  const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`;
  try {
    // Sign the data with the user's Ethereum account.
    return await ethereum.request({
      method: "personal_sign",
      params: [msg, from]
    });
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
      balance: null,
      showAccountInfo: false,
      isConnected: false,
      toAddress: "",
      amount: null,
      showSendEthBubble: false,
      transactionSuccess: false
    };
  },
  mounted() {
    onMounted(() => {
      if (window.ethereum) {
        this.connect();
      } else {
        alert("Please install MetaMask.");
      }
    });
    ethereum.on("accountsChanged", this.handleAccountsChanged);
  },
  methods: {
    async connect() {
      try {
        // Request the user to switch to the BNB Smart Chain network.
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }]
        });

        // Get the account balance.
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });
        const connectedAccount = localStorage.getItem("connectedAccount");
        console.log(connectedAccount);
        for (let i = 0; i < accounts.length; i++) {
          if (connectedAccount === accounts[i]) {
            this.isConnected = true;
            this.account = connectedAccount;
            return;
          } else {
            // Sign the data with the user's Ethereum account.
            const signature = await siweSign(accounts[0]);

            // If the user signed the data successfully, set the connection status to true.
            if (signature) {
              this.isConnected = true;
              const accounts = await ethereum.request({
                method: "eth_requestAccounts"
              });

              localStorage.setItem("connectedAccount", accounts[0]);
            }

            // Show the signature to the user.
            this.siweResult = signature;
          }
        }

        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0]]
        });
        // Update the app state.
        this.account = accounts[0];
        this.balance = balance;

        ethereum.on("accountsChanged", this.handleAccountsChanged);
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            // Add the BNB Smart Chain network to MetaMask.
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xaa36a7",
                  chainName: "Sepolia test network",
                  rpcUrls: ["https://sepolia.infura.io/v3/"],
                  nativeCurrency: {
                    name: "SepoliaETH",
                    symbol: "SepoliaETH",
                    decimals: 18
                  }
                }
              ]
            });
            const accounts = await ethereum.request({
              method: "eth_requestAccounts"
            });
            const connectedAccount = localStorage.getItem("connectedAccount");
            console.log(connectedAccount);
            for (let i = 0; i < accounts.length; i++) {
              if (connectedAccount === accounts[i]) {
                this.isConnected = true;
                this.account = connectedAccount;
                return;
              } else {
                // Sign the data with the user's Ethereum account.
                const signature = await siweSign(accounts[0]);

                // If the user signed the data successfully, set the connection status to true.
                if (signature) {
                  this.isConnected = true;
                  const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                  });

                  // Save account to Local Storage
                  localStorage.setItem("connectedAccount", accounts[0]);
                }

                // Show the signature to the user.
                this.siweResult = signature;
              }
            }
            // Update the app state.
            this.account = accounts[0];
            this.balance = balance;

            ethereum.on("accountsChanged", this.handleAccountsChanged);
          } catch (addError) {
            console.error(addError);
          }
        } else {
          console.error(switchError);
        }
      }
      ethereum.on("chainChanged", () => {
        this.isConnected = false;
        this.account = null;
        this.balance = null;
      });
    },
    async updateBalance() {
      try {
        if (this.account) {
          // Get balance of certain account
          this.balance = await ethereum.request({
            method: "eth_getBalance",
            params: [this.account]
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleAccountsChanged(accounts: any[]) {
      this.account = accounts[0];
      this.updateBalance();
    },
    async onLogout() {
      this.account = null;
      this.balance = null;
      this.isConnected = false;
      this.showAccountInfo = false;
      localStorage.removeItem("connectedAccount");
    },
    async showBubble() {
      this.showAccountInfo = true;
    },
    async unShowBubble() {
      this.showAccountInfo = false;
    },
    async sendEth() {
      try {
        if (!this.isConnected) {
          throw new Error("Please connect to MetaMask.");
        }
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [this.account]
        });
        const amountInWei = this.amount * 1e18; // Convert amount to Wei (1 Ether = 1e18 Wei)
        if (balance < amountInWei) {
          throw new Error("Insufficient balance.");
        }
        const txHash = await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.account,
              to: this.toAddress,
              value: `0x${amountInWei.toString(16)}`, // Convert amount to hex
              gasLimit: "0x5028",
              maxPriorityFeePerGas: "0x3b9aca00",
              maxFeePerGas: "0x2540be400"
            }
          ]
        });
        await ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [txHash]
        });

        this.transactionSuccess = true;
        this.toAddress = "";
        this.amount = null;
        this.showSendEthBubble = true;
      } catch (err) {
        console.error(err);
        alert("Failed to send ETH.");
      }
    },

    closeSendEthBubble() {
      this.showSendEthBubble = false;
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
</style>
