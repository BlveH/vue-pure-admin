<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import { useDark, useECharts, type EchartOptions } from "@pureadmin/utils";

const { isDark } = useDark();

let theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: "20%",
      height: "68%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0
          // width: "70",
          // overflow: "truncate"
        },
        data: ["open_issues", "forks", "watchers", "star"]
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "GitHub information",
        type: "bar",
        data: [3, 204, 1079, 1079]
      }
    ]
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  }
);
</script>

<template>
  <div ref="barChartRef" style="width: 100%; height: 35vh" />
</template>
