<template>
  <div class="h-screen">
    <div class="pt-2 h-full">
      <div class="text-right pr-2 mb-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          @click="isAddPostDialogShow = true"
        >
          发布贴文
        </button>
      </div>

      <div class="h-[88%]	overflow-auto" v-if="listOfPosts && listOfPosts.length">
        <div
          class="rounded overflow-hidden shadow-lg border border-gray-200 mb-2"
          v-for="post in listOfPosts"
          :key="post.id"
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

    <div
      class="fixed left-1/2 top-20 -translate-x-1/2 p-5 border w-96 shadow-lg rounded-md bg-white"
      v-show="isAddPostDialogShow"
    >
      <div class="mt-3">
        <div class="mt-2 px-7 py-3">
          <!-- <p class="text-sm text-gray-500">
            Account has been successfully registered!
          </p> -->
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
              ></textarea>

              <!-- <p class="text-red-500 text-xs italic">
                  Please choose a password.
                </p> -->
            </div>
          </form>
        </div>
        <div class="flex items-center px-4 py-3">
          <button
            class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md flex-1 mr-2 shadow-sm"
            @click="isAddPostDialogShow = false"
          >
            取消
          </button>
          <button
            class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md flex-1 shadow-sm"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
const $vm = getCurrentInstance();
const $axios = $vm.appContext.config.globalProperties.$axios;

const listOfPosts = ref([]);
const isAddPostDialogShow = ref(false);

const getPosts = () => {
  $axios.get("/posts").then(({ data }) => {
    listOfPosts.value = data;
    console.log(listOfPosts.value);
  });
};

onMounted(() => {
  getPosts();
});
</script>

<style lang="less" scoped>
</style>