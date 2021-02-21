<!-- layouts -->
<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer" v-if="$route.meta.showTab">
      <!-- 这里@change默认绑定在了van-tabbar上，参考vue的$attr -->
      <TabBar :tabbars="tabbars" :defaultActive="defaultActive" @change="handleChange" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import TabBar, { ITabList } from '@/components/TabBar.vue'
import { useRoute } from 'vue-router'
interface ILayoutState {
  tabbars: Array<ITabList>
  defaultActive: number
}
export default defineComponent({
  name: 'layouts',
  components: {
    TabBar
  },
  setup() {
    const route = useRoute()
    const state: ILayoutState = reactive({
      tabbars: [
        { title: '首页', to: { name: 'Home' }, icon: 'home-o' },
        // { title: '案例', to: { name: 'Dome' }, icon: 'star-o' },
        { title: '关于我', to: { name: 'About' }, icon: 'user-o' }
      ],
      defaultActive: computed(() => {
        return state.tabbars.findIndex((item: ITabList) => {
          return item.to.name === route.name
        })
      })
    })
    const handleChange = (v: number) => {
      console.log('tab value:', v)
    }

    return {
      ...toRefs(state),
      handleChange
    }
  }
})
</script>
<style lang="scss" scoped></style>
