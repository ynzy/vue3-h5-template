<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<div class="block">23123</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
	name: 'Home',
	components: {
		HelloWorld
	}
})
</script>
<style lang="scss" scoped>
.block {
	font-size: 12px;
}
</style>
