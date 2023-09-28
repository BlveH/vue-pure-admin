<template>
  <el-dialog
    top="5vh"
    :width="device === 'mobile' ? '80vw' : '50vw'"
    v-model="show"
    :before-close="handleClose"
  >
    <Metamask />
    <WalletConnection />
  </el-dialog>
</template>

<script lang="ts" setup>
import { useNav } from "/@/layout/hooks/useNav";
import { watch, computed, nextTick } from "vue";
import Metamask from "/@/layout/components/wallet/components/metamask/index.vue";
import WalletConnection from "/@/layout/components/wallet/components/walletconnection/index.vue";
interface Props {
  /** pop-up window */
  value: boolean;
}

interface Emits {
  (e: "update:value", val: boolean): void;
}

const { device } = useNav();
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {});

const show = computed({
  get() {
    return props.value;
  },
  set(val: boolean) {
    emit("update:value", val);
  }
});

watch(show, async val => {
  if (val) {
    /** auto focus */
    await nextTick();
  }
});

function handleClose() {
  show.value = false;
}
</script>

<style lang="scss" scoped>
.search-result-container {
  margin-top: 20px;
}
</style>
