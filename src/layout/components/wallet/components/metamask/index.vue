<template>
  <div>
    <button
      id="connectButton"
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
    <button class="sendEthButton btn" v-show="isConnected">Send ETH</button>

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

async function siweSign(account) {
  const domain = window.location.host;
  const from = account;
  const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2023-09-28T10:26:48.000Z`;
  const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`;
  try {
    // Sign the data with the user's Ethereum account.
    const signature = await ethereum.request({
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
        alert("Please install MetaMask.");
      }
    });
    ethereum.on("accountsChanged", this.handleAccountsChanged);
    document.getElementById("connectButton");
  },
  methods: {
    async connect() {
      try {
        // Request the user to switch to the BNB Smart Chain network.
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }]
        });

        // Get the account balance.
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });
        const balance = await ethereum.request({
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
        ethereum.on("accountsChanged", this.handleAccountsChanged);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            // Add the BNB Smart Chain network to MetaMask.
            await ethereum.request({
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
            const accounts = await ethereum.request({
              method: "eth_requestAccounts"
            });
            const balance = await ethereum.request({
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
            ethereum.on("accountsChanged", this.handleAccountsChanged);
          } catch (addError) {
            console.error(addError);
          }
        } else {
          console.error(switchError);
        }
      }
      // Disconnect the user if the network changes.
      ethereum.on("chainChanged", () => {
        this.isConnected = false;
        this.account = null;
        this.balance = null;
      });
    },
    handleAccountsChanged(accounts) {
      // Update the app state.
      this.account = accounts[0];
    },
    async onLogout() {
      // Xóa thông tin tài khoản và đặt lại trạng thái chưa kết nối.
      this.account = null;
      this.balance = null;
      this.isConnected = false;

      // Ẩn thông tin tài khoản.
      this.showAccountInfo = false;

      // Nếu bạn cần xóa thêm dữ liệu khác hoặc thực hiện các thao tác khác khi đăng xuất, hãy thêm chúng ở đây.
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
