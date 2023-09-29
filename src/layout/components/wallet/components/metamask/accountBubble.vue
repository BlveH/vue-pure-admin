<template>
  <div class="account-bubble" :draggable="draggable">
    <h2>Account Information</h2>
    <ul>
      <li>Address: {{ account }}</li>
      <li>Balance: {{ balance }}</li>
    </ul>
    <button>Log Out</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountBubble",

  props: {
    account: {
      type: String,
      required: true
    },
    balance: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      draggable: true
    };
  },
  methods: {
    // async logout() {
    //   // Disconnect the user.
    //   await window.ethereum.request({
    //     method: "wallet_disconnect"
    //   });
    //
    //   // Request a new connection.
    //   const accounts = await window.ethereum.request({
    //       method: "wallet_requestPermissions",
    //       params: [
    //         {
    //           eth_accounts: {}
    //         }
    //       ]
    //     })
    //     .then(() =>
    //       window.ethereum.request({
    //         method: "eth_requestAccounts"
    //   }));
    //
    //   // Update the app state.
    //   // this.account = accounts[0];
    // }
  }
});
</script>

<style scoped>
.account-bubble {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  cursor: move;
}
</style>
