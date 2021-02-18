<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<div class="block">23123</div>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="info">信息按钮</van-button>
		<van-button type="default">默认按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
		<van-button plain type="primary">朴素按钮</van-button>
		<van-button plain type="info">朴素按钮</van-button>
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
	display: flex;
	font-size: 12px;
}
</style>
