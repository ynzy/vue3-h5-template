<template>
	<!-- <div id="app"> -->
	<!-- <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> | <router-link to="/rem">Rem</router-link> |
		<router-link to="/scssConfig">scssConfig</router-link> -->
	<!-- <router-view /> -->
	<!-- </div> -->
	<router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import config from '@/config/index'

export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		console.log('环境配置', config)
	}
})
</script>
<style lang="scss"></style>
