<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<ul class="block">
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="success">成功按钮</van-button>
		<van-button type="default">默认按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
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
	@include flexbox();
	font-size: 20px;
	color: $theme-color;
}
</style>
