<!-- about -->
<template>
	<router-link to="/rem">Rem</router-link> |
	<router-link to="/scssConfig">scssConfig</router-link>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
	name: 'about',
	props: {},
	setup() {
		onMounted(() => {
			axios
				.get('/vue-h5/user/info')
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.error(err)
				})
		})
	}
})
</script>
<style lang="scss" scoped></style>
