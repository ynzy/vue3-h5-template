<!-- ScssConfig -->
<template>
  <div class="contenter">
    <div class="title">flex混合</div>
    <ul class="flex">
      <li>1</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ScssConfig',
  props: {},
  setup() {
    console.log('1')
  }
})
</script>
<style lang="scss" scoped>
.flex {
  @include flexbox();
  color: $theme-color;
}
</style>
