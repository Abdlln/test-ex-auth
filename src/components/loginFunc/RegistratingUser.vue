<template>
  <div v-if="autorizing.isLogin" class="login-container">
    <h2>{{ autorizing.infoText }}</h2>
    <form @submit.prevent="handleCraeteSubmit">
      <div>
        <label for="firstName" class="label-text">Имя:</label>
        <input type="text" id="firstName" v-model="firstName" required autocomplete="off" />
      </div>
      <div>
        <label for="lastName" class="label-text">Фамилия:</label>
        <input type="text" id="lastName" v-model="lastName" required autocomplete="off" />
      </div>
      <div>
        <label for="createusername" class="label-text">Логин:</label>
        <input
          type="text"
          id="createusername"
          v-model="createusername"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label for="craetepassword" class="label-text">Пароль:</label>
        <input
          type="password"
          id="craetepassword"
          v-model="craetepassword"
          required
          autocomplete="off"
        />
      </div>
      <button type="submit" class="btn-sub">{{ autorizing.infoButton }}</button>
    </form>
    <p v-if="autorizing.errorMessage" style="color: red">{{ autorizing.errorMessage }}</p>
    <div class="login-under">
      <span>{{ autorizing.subFormText }} </span>
      <span @click.prevent="toggleChange" class="login-text-toggle">
        {{ autorizing.linkAccountText }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useAutorizeStore } from '../../stores/autorize'
const router = useRouter()
const autorizing = useAutorizeStore()
const craetepassword = ref('')
const createusername = ref('')
const firstName = ref('')
const lastName = ref('')

const handleCraeteSubmit = async (): Promise<void> => {
  const addsuccess = await autorizing.handleCreate(
    createusername.value,
    craetepassword.value,
    firstName.value,
    lastName.value,
    'user',
  )

  if (addsuccess) {
    router.push(`/user/${createusername.value}`)
  } else {
    router.push(`/`)
  }
  craetepassword.value = ''
  createusername.value = ''
  firstName.value = ''
  lastName.value = ''
}

const toggleChange = (): void => {
  autorizing.isLogin = !autorizing.isLogin
}
</script>
