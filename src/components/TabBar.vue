<!-- TabBar -->
<template>
  <van-tabbar v-model="active" fixed route>
    <van-tabbar-item v-for="(item, index) in tabbars" :to="item.to" :icon="item.icon" :key="index">
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
export interface ITabList {
  title: string // 标题
  to: { name: string } // url路径
  icon: string // 图标
}
export default defineComponent({
  name: 'TabBar',
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    tabbars: {
      type: Array as PropType<ITabList[]>, // 类型断言
      default: () => {
        return []
      }
    }
  },
  setup(props) {
    const active = ref(props.defaultActive)
    return {
      active
    }
  }
})
</script>
<style lang="scss" scoped></style>
