<template>
  <div class="h-screen flex flex-col">
    <header class="bg-green-500 py-4 px-6 text-white flex justify-between items-center">
      <div class="text-lg font-bold" @click="router.go(-1)">←</div>
      <h1 class="text-lg font-bold">{{postData.title}}</h1>
      <div class="text-sm">{{postData.username}}</div>
    </header>
    <div class="flex-1 flex flex-col">
      <div class="flex-1 p-6 overflow-y-scroll">
        {{postData.postText}}
      </div>
      <div class="h-1/4 bg-gray-100 p-6 overflow-y-scroll">
        <!-- Comments  -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, computed } from "vue"
import { useRouter, useRoute } from 'vue-router'

const $vm = getCurrentInstance()
const $axios = $vm.appContext.config.globalProperties.$axios
const router = useRouter()
const route = useRoute()

// console.log(route.params)
const postId = route.params.id

const postData = ref({})
const getPost = () => {
  $axios.get(`/posts/${postId}`).then(({ data }) => {
    postData.value = data
  });
}

onMounted(() => {
  getPost()
})
</script>

<style>

</style>