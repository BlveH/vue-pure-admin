<template>
  <div class="account-bubble" :draggable="draggable">
    <h2>Account Information</h2>
    <ul>
      <li>Address: {{ account }}</li>
      <li>Balance: {{ balance }}</li>
    </ul>
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
