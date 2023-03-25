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
      <div class="h-1/4 bg-gray-100 p-2 overflow-y-scroll">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 text-sm rounded mb-2" @click="isCommentDialogShow = true">
          评论
        </button>
        <div class="border p-2" v-for="comment in commentData" :key="comment.id">
          <div class="font-bold mb-2">{{comment.commentBody}}</div>
          <div class="flex justify-between text-sm text-gray-500">
            <div>{{comment.createdAt}}</div>
            <div>{{comment.username}}</div>
          </div>
        </div>
      </div>
    </div>
    
    <Dialog v-model:show="isCommentDialogShow" @comfirm="handleComment">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-6">
          <label
            for="comment"
            class="block text-gray-700 text-sm font-bold mb-2"
            >comment</label
          >
          <textarea
            id="comment"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            v-model="commentForm.commentBody"
          ></textarea>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, computed } from "vue"
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';

import Dialog from '../../components/dialog.vue'

const $vm = getCurrentInstance()
const $axios = $vm.appContext.config.globalProperties.$axios
const router = useRouter()
const route = useRoute()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const postId = route.params.id

const postData = ref({})
const getPost = () => {
  $axios.get(`/posts/${postId}`).then(({ data }) => {
    postData.value = data
  });
}
const commentData = ref({})
const getComments = () => {
  $axios.get(`/comments/${postId}`).then(({ data }) => {
    commentData.value = data
  });
}

const isCommentDialogShow = ref(false)
const commentForm = ref({
  commentBody: '',
  username: userInfo.value.username,
  PostId: postId
})
const handleComment = () => {
  $axios.post(`/comments`, commentForm.value).then(({ data }) => {
    console.log('success')
    isCommentDialogShow.value = false
    getComments()
  });
}

onMounted(() => {
  getPost()
  getComments()
})
</script>

<style>

</style>