<!-- about -->
<template>
	<!-- <router-link to="/rem">Rem</router-link> | -->
	<!-- <router-link to="/scssConfig">scssConfig</router-link> -->
	<div class="about_container">
		<div class="item avatar">
			<van-image width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
		</div>
		<div class="item author">项目作者：{{ userInfo.author }}</div>
		<div class="item url">
			<a target="_blank" :href="userInfo.projectAddress">项目地址{{ userInfo.projectAddress }}</a>
		</div>
		<div class="item url">
			<a target="_blank" :href="userInfo.demoUrl">demo地址{{ userInfo.demoUrl }}</a>
		</div>
		<div class="item code_url">
			<van-image width="100" height="100" :src="userInfo.demoCodeUrl" />
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { fetchUserInfo } from '@/api/authController.ts'
import { useStore } from 'vuex'
import * as Types from '@/store/modules/Auth/types'
import { IGlobalState } from '@/store'

export default defineComponent({
	name: 'about',
	props: {},
	setup(props) {
		const store = useStore<IGlobalState>()
		const userInfo = computed(() => {
			return store.state.auth.userInfo
		})
		onMounted(async () => {
			try {
				let res = await fetchUserInfo()
				if (res.code !== 0) return new Error(res.msg)
				store.dispatch(`auth/${Types.SAVE_USER_INFO}`, res.data)
			} catch (error) {
				console.log(error)
			}
		})
		return {
			userInfo
		}
	}
})
</script>
<style lang="scss" scoped>
.about_container {
	height: 100vh;
	@include flexbox(center, center, column);
	.item {
		margin: 15px 0;
	}
	.url {
		font-size: 14px;
	}
}
</style>
