<template>
  <div class="h-screen">
    <div class="pt-2 h-full">
      <div class="flex justify-between pr-2 pl-2 mb-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
          @click="isPostDialogShow = true"
        >
          发布贴文
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
          @click="handleLoginBtnClick"
          v-if="!userInfo"
        >
          登录
        </button>
        <span v-else class="mt-1">
          {{userInfo.username}}

          <button class="text-gray-500 hover:text-gray-700 text-sm" @click="logout">退出登录</button>
        </span>
      </div>

      <div class="h-[88%]	overflow-auto" v-if="listOfPosts && listOfPosts.length">
        <div
          class="rounded overflow-hidden shadow-lg border border-gray-200 mb-2"
          v-for="post in listOfPosts"
          :key="post.id"
          @click="navigateToDetail(post.id)"
        >
          <div class="px-6 py-4">
            <div class="flex justify-between">
              <div class="font-bold text-xl mb-2">{{ post.title }}</div>
              <div>{{ post.username }}</div>
            </div>
            <p class="text-gray-700 text-base">
              {{ post.postText }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-sm text-center">暂无帖文</div>
    </div>


    <Dialog v-model:show="isPostDialogShow" @comfirm="handlePost">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="title"
          >
            title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="title"
            v-model="postForm.title"
          />
        </div>
        <div class="mb-6">
          <label
            for="message"
            class="block text-gray-700 text-sm font-bold mb-2"
            >text</label
          >
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            v-model="postForm.postText"
          ></textarea>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, computed } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

import Dialog from '../../components/dialog.vue'

const $vm = getCurrentInstance()
const router = useRouter()
const store = useStore()
const $axios = $vm.appContext.config.globalProperties.$axios
const userInfo = computed(() => store.state.userInfo)
console.log(userInfo.value)

const listOfPosts = ref([]);
const getPosts = () => {
  $axios.get("/posts").then(({ data }) => {
    listOfPosts.value = data;
    console.log(listOfPosts.value);
  });
};

const isPostDialogShow = ref(false);

const handleLoginBtnClick = () => {
  router.push('/login')
}

const logout = () => {
  localStorage.removeItem('userInfo')
  store.commit('setUserInfo', null)
}

const postForm = ref({
  title: '',
  postText: '',
  username: ''
})
const handlePost = () => {
  postForm.value.username = userInfo.value.username
  $axios.post("/posts", postForm.value).then(({ data }) => {
    isPostDialogShow.value = false
    getPosts()
  });
}

const navigateToDetail = (id) => {
  router.push({
    path: `/posts/${id}`
  })
}

onMounted(() => {
  getPosts();
});
</script>

<style lang="less" scoped>
</style>