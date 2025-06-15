<template>
  <div class="notes-page">
    <div class="quit-btn">
      <p @click="handleMenuChange('Пользователи')">Пользователи</p>
      <p @click="handleMenuChange('Заметки пользователей')">Записки пользователей</p>
      <p class="user-info" v-if="users">{{ users.firstName }} {{ users.lastName }}</p>
      <img src="/public/delete.svg" alt="delete" @click="logOut" class="quit-img" />
    </div>
    <div v-if="hanldeMenu == 'Заметки пользователей'">
      <ul class="notes-ul">
        <li v-for="note in notes" :key="note.id" class="notes-li">
          <h2>{{ note.title }}</h2>
          <p>Пользователь: {{ note.firstName }} {{ note.lastName }}</p>
          <div>
            <p>{{ note.content }}</p>
          </div>
          <div>
            <h3 @click="deletingNote(note.id)" class="delete-btn">Удалить</h3>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="hanldeMenu == 'Пользователи'">
      <ul class="notes-ul">
        <li v-for="note in uniqueUsers" :key="note.id" class="notes-li">
          <p>Пользователь: {{ note.firstName }} {{ note.lastName }}</p>

          <div>
            <h3 @click="deletingNote(note.id)" class="delete-btn">Удалить</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { useAutorizeStore } from '@/stores/autorize'

const autorizeStore = useAutorizeStore()
const router = useRouter()
const notesStore = useNotesStore()

const notes = computed(() => notesStore.notes)
const users = computed(() => autorizeStore.userLogin)
const hanldeMenu = ref('')
const uniqueUsers = computed(() => {
  const unique = []
  const seen = new Set()
  notes.value.forEach((note) => {
    const userName = `${note.firstName} ${note.lastName}`
    if (!seen.has(userName)) {
      seen.add(userName)
      unique.push(note)
    }
  })
  return unique
})
const handleMenuChange = (menu) => {
  hanldeMenu.value = menu
}

onMounted(() => {
  const savedNotes = sessionStorage.getItem('notes')

  if (savedNotes !== null) {
    notesStore.setNotes(JSON.parse(savedNotes))
  }
})

const deletingNote = (id) => {
  notesStore.deleteNote(id)
}

const logOut = () => {
  router.push('/')
}
</script>

<style scoped>
.users-admin {
  display: flex;

  gap: 20px;
}

.users-admin p {
  display: inline;

  margin-right: 20px;
}
.modal-window button {
  flex: 1;
  margin: 5px;
}
.btn-group {
  display: flex;
  gap: 12px;
}
.btn-dob {
  height: 44px;
  width: 360px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 95, 249, 1);
  color: white;
}
.btn-otm {
  height: 44px;
  width: 360px;
  border-radius: 5px;
  border: none;
  background-color: rgba(24, 24, 25, 1);
  color: white;
}
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
}
.delete-btn {
  cursor: pointer;
  color: red;
  margin-top: 20px;
  width: 100px;
  justify-content: center;
  display: inline-flex;
}
.notes-page {
  margin: 0 auto;
  max-width: 70%;
}
.modal-window > div {
  display: flex;
  flex-direction: column;
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  position: fixed;
}

.modal-window {
  background-color: rgba(42, 42, 43, 1);
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 300px;
  padding: 20px;
  text-align: center;
  overflow-y: auto;
  outline: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
}

.modal-window button {
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  align-items: center;
  justify-content: center;
  height: 35px;
}
.notes-ul {
  list-style: none;
}

.notes-li {
  padding: 20px;
  background-color: rgba(42, 42, 43, 1);
  list-style: none;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.quit-img {
  cursor: pointer;
}

.user-info {
  text-align: right;
  margin-right: 10px;
}
</style>
