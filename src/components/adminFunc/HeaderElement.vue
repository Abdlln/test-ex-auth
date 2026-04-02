<template>
  <div class="quit-btn">
    <p @click="handleMenuChange('Пользователи')">Пользователи</p>
    <p @click="handleMenuChange('Заметки пользователей')">Записки пользователей</p>
    <p class="user-info" v-if="users">{{ users.firstName }} {{ users.lastName }}</p>
    <img src="/public/delete.svg" alt="delete" @click="logOut" class="quit-img" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAutorizeStore } from '../../stores/autorize'

const autorizeStore = useAutorizeStore()
const router = useRouter()
const hanldeMenu = ref('Пользователи')
const users = computed(() => autorizeStore.userLogin)

const emit = defineEmits(['update:menu'])

const handleMenuChange = (menu: string): void => {
  hanldeMenu.value = menu
  emit('update:menu', menu)
}

const logOut = () => {
  autorizeStore.logOut()
  router.push('/')
}
</script>

<style>
.quit-btn {
  display: flex;
  justify-content: right;
  padding: 20px;
  align-items: center;
  padding: 20px;
}

.quit-btn p {
  padding: 10px;
  cursor: pointer;
}

.user-info {
  text-align: right;
  margin-right: 10px;
}

.quit-img {
  cursor: pointer;
}
</style>
