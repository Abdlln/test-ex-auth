<script setup>
import { ref, computed } from 'vue'
import { useAutorizeStore } from '../stores/autorize'
import { useRouter } from 'vue-router'
const autorizing = useAutorizeStore()
const router = useRouter()
const isLogin = ref(false)
const username = ref('')
const craetepassword = ref('')
const createusername = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const toggleChange = () => {
  isLogin.value = !isLogin.value
}

const infoText = computed(() => (isLogin.value ? 'Авторизуйтесь' : 'Введите ваш логин и пароль'))
const infoButton = computed(() => (isLogin.value ? 'Регистрация' : 'Войти'))
const linkAccountText = computed(() => (isLogin.value ? 'Войдите в него' : 'Создайте сейчас'))
const subFormText = computed(() => (isLogin.value ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'))

const handleSubmit = async () => {
  const success = await autorizing.handleLogin(username.value, password.value)
  if (success) {
    router.push(`/user/${username.value}`)
    console.log('usecces', success)
  } else {
    router.push(`/`)
  }
}

const handleCraeteSubmit = async () => {
  const addsuccess = await autorizing.handleCreate(
    createusername.value,
    craetepassword.value,
    firstName.value,
    lastName.value,
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
</script>

<template>
  <div class="page-wrapper">
    <div v-if="!isLogin" class="login-container">
      <div class="login-text">
        <h2>Добро Пожаловать</h2>
        <p>{{ infoText }}</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username" class="label-text">Логин:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password" class="label-text">Пароль:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn-sub">{{ infoButton }}</button>
      </form>
      <p v-if="autorizing.errorMessage" style="color: red">{{ autorizing.errorMessage }}</p>
      <div class="login-under">
        <span>{{ subFormText }}</span>
        <span @click.prevent="toggleChange" class="login-text-toggle">{{ linkAccountText }}</span>
      </div>
    </div>

    <div v-if="isLogin" class="login-container">
      <h2>{{ infoText }}</h2>
      <form @submit.prevent="handleCraeteSubmit">
        <div>
          <label for="firstName" class="label-text">Имя:</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>
        <div>
          <label for="lastName" class="label-text">Фамилия:</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>
        <div>
          <label for="createusername" class="label-text">Логин:</label>
          <input type="text" id="createusername" v-model="createusername" required />
        </div>
        <div>
          <label for="craetepassword" class="label-text">Пароль:</label>
          <input type="password" id="craetepassword" v-model="craetepassword" required />
        </div>
        <button type="submit" class="btn-sub">{{ infoButton }}</button>
      </form>
      <p v-if="autorizing.errorMessage" style="color: red">{{ autorizing.errorMessage }}</p>
      <div class="login-under">
        <span>{{ subFormText }} </span>
        <span @click.prevent="toggleChange" class="login-text-toggle"> {{ linkAccountText }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.login-text-toggle {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
  margin-left: 5px;
}

.login-container {
  background-color: rgba(42, 42, 43, 1);

  height: auto;
  padding: 20px;
  width: 408px;
  height: 424px;
  margin-top: 100px;
  border-radius: 10px;
  margin-bottom: 200px;
}
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  height: 100vh;
}

input {
  height: 34px;
  border-radius: 5px;
}
form > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

form > div > label {
  margin-bottom: 5px;
  font-weight: bold;
}

label {
  text-align: left;
}
.label-text {
  font-size: 14px;
  font-weight: 300;
}
.login-text {
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 30px;
}

.btn-sub {
  margin-top: 15px;
  background-color: rgba(0, 95, 249, 1);
  height: 44px;
  width: 404px;
  border: none;
  border-radius: 5px;
  color: white;
}
.login-under {
  padding: 10px;
}
</style>
