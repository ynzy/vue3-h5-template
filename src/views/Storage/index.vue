<!-- Storage -->
<template>
  <div class="storage_container">
    <ul class="storage_data">
      <li>
        原数据：
        <pre>{{ originalData }}</pre>
      </li>
      <li>
        storage数据：
        <pre>{{ storageData }}</pre>
      </li>
      <li>
        storage数据：
        <pre>{{ sessionStorageData }}</pre>
      </li>
    </ul>
    <div class="storage_btn">
      <div class="item">
        <button @click="saveStorage('storage')" class="btn">存入storage数据</button>
        <button @click="getStorage('storage')" class="btn">取出storage数据</button>
      </div>
      <div class="item">
        <button @click="saveStorage('sessionStorage')" class="btn">存入sessionStorage数据</button>
        <button @click="getStorage('sessionStorage')" class="btn">取出sessionStorage数据</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { storage, sessionStorage } from '@/utils/storage'
import { Toast } from 'vant'
import { defineComponent, ref } from 'vue'
interface IstorageData {
  name: string
  age: number
}
export default defineComponent({
  name: 'Storage',
  props: {},
  setup() {
    const originalData = ref<IstorageData>({
      name: '张三',
      age: 14
    })
    const storageData = ref<IstorageData>()
    const sessionStorageData = ref<IstorageData>()
    const saveStorage = (type: string) => {
      if (type === 'storage') {
        storage.set('data', originalData.value)
      } else {
        sessionStorage.set('data', originalData.value)
      }
      Toast('存入成功')
    }
    const getStorage = (type: string) => {
      if (type === 'storage') {
        storageData.value = storage.get('data')
      } else {
        sessionStorageData.value = sessionStorage.get('data')
      }
    }
    return {
      originalData,
      storageData,
      sessionStorageData,
      saveStorage,
      getStorage
    }
  }
})
</script>
<style lang="scss" scoped>
.storage_container {
  padding: 20px;
  height: 100%;
  background: #fff;
}
.storage_data {
  font-size: 14px;
  p {
    margin: 10px 0;
  }
  pre {
    margin-left: 20px;
  }
}
.storage_btn {
  margin-top: 20px;
  .item {
    display: flex;
    // justify-content: space-around;
    // margin: 10px;
    .btn {
      margin: 10px;
      flex: 1;
      font-size: 14px;
    }
  }
}
</style>
