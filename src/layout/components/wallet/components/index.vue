<script setup lang="ts">
import { useBoolean } from "../../../hooks/useBoolean";
import ListWallet from "/@/layout/components/wallet/components/listWallet.vue";
const { bool: show, toggle } = useBoolean();

function handleSearch() {
  toggle();
}
</script>
<template>
  <div>
    <button
      class="search-container w-40px h-48px flex-c cursor-pointer navbar-bg-hover"
      @click="handleSearch"
    >
      Connect
    </button>
    <ListWallet v-model:value="show" />
  </div>
</template>

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
