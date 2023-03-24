<template>
  <div class="flex justify-center items-center h-screen">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="username"
          v-model="form.username"
        />
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2"
          >password</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="text"
          placeholder="password"
          v-model="form.password"
        />
      </div>
      <p class="text-sm text-gray-600 mt-4" v-if="isLoginType">
        还没有账号？
        <a href="#" class="text-blue-500 hover:text-blue-700 font-medium" @click="type = 'register'">现在注册</a>
      </p>
      <p class="text-sm text-gray-600 mt-4" v-else>
        已有账号，
        <a href="#" class="text-blue-500 hover:text-blue-700 font-medium" @click="type = 'login'">现在登录</a>
      </p>
      <button v-if="isLoginType" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 w-full rounded mt-4" @click.prevent="handleLogin">
        登录
      </button>
      <button v-else class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 w-full rounded mt-4" @click.prevent="handleRegister">
        注册
      </button>
    </form>
  </div>
</template>

<script setup>
import {ref, computed, getCurrentInstance} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const $vm = getCurrentInstance()
const $axios = $vm.appContext.config.globalProperties.$axios
const store = useStore()
const router = useRouter()

let type = ref('login')
const isLoginType = computed(() => type.value === 'login')

const form = ref({
  username: '',
  password: ''
})
const handleLogin = () => {
  $axios.post("/auth/login", form.value).then(({ data }) => {
    console.log(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
    store.commit('setUserInfo', data)
    router.push('/posts')
  }).catch(err => {
    alert(err)
  })
}
const handleRegister = () => {
  $axios.post("/auth/register", form.value).then(({ data }) => {
    alert('注册成功')
    type.value = 'login'
    form.value.password = ''
  }).catch(err => {
    alert(err)
  })
}
</script>

<style>

</style>