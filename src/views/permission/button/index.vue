<script setup lang="ts">
import { ref } from "vue";
import type { StorageConfigs } from "/#/index";
import { storageSession } from "@pureadmin/utils";

defineOptions({
  name: "PermissionButton"
});

const auth = ref(
  storageSession.getItem<StorageConfigs>("info").username || "admin"
);

function changRole(value) {
  storageSession.setItem("info", {
    username: value,
    accessToken: `eyJhbGciOiJIUzUxMiJ9.${value}`
  });
  window.location.reload();
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-radio-group v-model="auth" @change="changRole">
          <el-radio-button label="admin" />
          <el-radio-button label="test" />
        </el-radio-group>
      </div>
    </template>
    <p v-auth="'v-admin'">Only admin can see</p>
    <p v-auth="'v-test'">Only test can be seen</p>
  </el-card>
</template>
