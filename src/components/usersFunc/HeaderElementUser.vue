<template>
  <div>
    <div class="quit-btn">
      <p class="user-info" v-if="users">{{ users.firstName }} {{ users.lastName }}</p>
      <img src="/public/delete.svg" alt="delete" @click="logOut" class="quit-img" />
    </div>
    <div class="notes-add">
      <h2>Ваши заметки</h2>
      <button @click="openModal" class="add-btn">Новая заметка +</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAutorizeStore } from '../../stores/autorize'

const autorizeStore = useAutorizeStore()
const router = useRouter()
const users = computed(() => autorizeStore.userLogin)

const props = defineProps({
  openModal: Function,
})

const logOut = () => {
  autorizeStore.logOut()
  router.push('/')
}
</script>

<style>
.notes-add {
  display: flex;
  justify-content: space-between;
}
.add-btn {
  background-color: rgba(0, 95, 249, 1);
  color: white;
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
}
</style>
