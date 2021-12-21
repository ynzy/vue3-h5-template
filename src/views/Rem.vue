<!-- Rem -->
<template>
  <div class="block">Rem适配</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Rem',
  props: {},
  setup() {
    console.log(1)
  }
})
</script>
<style lang="scss" scoped>
.block {
  display: flex;
  width: 100%;
  height: 375px;
  font-size: 12px;
  background: pink;
  padding: 1px;
}
</style>
