<template>
  <div class="page-wrapper">
    <LoginingUser />
    <RegistratingUser />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAutorizeStore } from '../stores/autorize'
import LoginingUser from './loginFunc/LoginingUser.vue'
import RegistratingUser from './loginFunc/RegistratingUser.vue'

const autorizeStore = useAutorizeStore()
const users = autorizeStore.users
const userLogin = autorizeStore.userLogin
onMounted(async () => {
  await autorizeStore.getUsers()
  autorizeStore.getUserLogin()
  console.log('users', users)
  console.log('usersLogin', userLogin)
})
</script>

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
  position: relative;
  padding-top: 60px;
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
  padding: 4px;
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
.autorize-icon {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.autorize-icon img {
  max-width: 100%;
}
</style>
