<template>
  <!-- <div id="app"> -->
  <!-- <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> | <router-link to="/rem">Rem</router-link> |
		<router-link to="/scssConfig">scssConfig</router-link> -->
  <!-- <router-view /> -->
  <!-- </div> -->
  <router-view />
  <MobileConsole />
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue'
import { config } from '@/config/index'
import MobileConsole from '@/components/Common/MobileConsole/index.vue'
export default defineComponent({
  name: 'App',
  components: { MobileConsole },
  setup() {
    console.log('环境配置', config)
  }
})
</script>
<style lang="scss"></style>
