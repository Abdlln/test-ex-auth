<template>
  <div v-if="!autorizing.isLogin" class="login-container">
    <div class="autorize-icon">
      <img src="/public/autorizeIcon.svg" alt="no" />
    </div>
    <div class="login-text">
      <h2>Добро Пожаловать</h2>
      <p>{{ autorizing.infoText }}</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username" class="label-text">Логин:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password" class="label-text">Пароль:</label>
        <input type="password" id="password" v-model="password" required autocomplete="off" />
      </div>
      <button type="submit" class="btn-sub">{{ autorizing.infoButton }}</button>
    </form>
    <p v-if="autorizing.errorMessage" style="color: red">{{ autorizing.errorMessage }}</p>
    <div class="login-under">
      <span>{{ autorizing.subFormText }}</span>
      <span @click.prevent="toggleChange" class="login-text-toggle">{{
        autorizing.linkAccountText
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useAutorizeStore } from '../../stores/autorize'
const router = useRouter()
const autorizing = useAutorizeStore()
const username = ref<string>('')
const password = ref<string>('')

const handleSubmit = async (): Promise<void> => {
  const success = await autorizing.handleLogin(username.value, password.value)
  if (autorizing.userLogin && success && autorizing.userLogin.role === 'admin') {
    router.push(`/admin/${autorizing.userLogin.username}`)
  } else if (success) {
    router.push(`/user/${username.value}`)
  } else {
    router.push(`/`)
  }
}
const toggleChange = () => {
  autorizing.isLogin = !autorizing.isLogin
  console.log('changed')
}
</script>
