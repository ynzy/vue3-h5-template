<!-- about -->
<template>
	<router-link to="/rem">Rem</router-link> |
	<router-link to="/scssConfig">scssConfig</router-link>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { fetchUserInfo } from '@/api/authController.ts'
interface IUserInfo {
	avator: string
}

export default defineComponent({
	name: 'about',
	props: {},
	setup() {
		onMounted(async () => {
			try {
				let res = await fetchUserInfo()
				console.log(res)
			} catch (error) {
				console.log(error)
			}
		})
	}
})
</script>
<style lang="scss" scoped></style>
