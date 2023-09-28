<script setup lang="ts">
import { ref, computed } from "vue";
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
import avatars from "/@/assets/avatars.jpg";
import Github from "./components/Github.vue";
import Infinite from "./components/Infinite.vue";

defineOptions({
  name: "Welcome"
});

const date: Date = new Date();
let loading = ref<boolean>(true);

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

let greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return "The morning is sunny, I wish you double your salary 🌞!";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "In the afternoon, Xiaofengjiao is good, may you be young and not old😃!";
  } else {
    return "Hãy gấp một chiếc lông vũ thiên thần, những mệt mỏi, muộn phiền và buồn phiền của bạn sẽ được xóa tan 🌛!";
  }
});

const openDepot = (): void => {
  window.open("https://github.com/xiaoxian521/vue-pure-admin");
};
</script>

<template>
  <div class="welcome">
    <el-card class="top-content dark:border-none">
      <div class="left-mark">
        <img :src="avatars" title="Direct warehouse address" @click="openDepot" />
        <span>{{ greetings }}</span>
      </div>
    </el-card>

    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card style="height: 360px">
          <template #header>
            <span style="font-size: 16px; font-weight: 500">GitHub information</span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Github />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card style="height: 360px">
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              GitHub rolling information
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Infinite />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              Thông tin về biểu đồ hình tròn GitHub
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Pie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              Thông tin về Biểu đồ Đường GitHub
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Line />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              Thông tin biểu đồ GitHub
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Bar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style module scoped>
.size {
  height: 335px;
}
</style>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}

.welcome {
  height: 100%;

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: var(--el-bg-color);

    .left-mark {
      display: flex;
      align-items: center;

      img {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
