<template>
  <div class="notes-page">
    <div class="quit-btn">
      <p class="user-info">{{ usernameParam }}</p>
      <img src="/public/delete.svg" alt="delete" @click="logOut" class="quit-img" />
    </div>
    <div class="notes-add">
      <h2>Ваши заметки</h2>
      <button @click="openModal" class="add-btn">Новая заметка +</button>
    </div>

    <div v-if="modal" class="modal-overlay">
      <div class="modal-window">
        <h2>Новая заметка</h2>

        <div>
          <label for="newNoteTitle">Заголовок</label>
          <input v-model="newNoteTitle" id="newNoteTitle" type="text" />
        </div>

        <div>
          <label for="newNoteContent">Текст</label>
          <input v-model="newNoteContent" id="newNoteContent" type="text" />
        </div>

        <span class="btn-group">
          <button @click="closeModal" class="btn-otm">Отмена</button>
          <button @click="addNewNote" class="btn-dob">Добавить</button>
        </span>
      </div>
    </div>

    <h3>Мои заметки</h3>
    <ul class="notes-ul">
      <li v-for="note in notes" :key="note.id" class="notes-li">
        <h2>Заголовок: {{ note.title }}</h2>
        <div>
          <p>{{ note.content }}</p>
        </div>
        <div>
          <h3 @click="deletingNote(note.id)" class="delete-btn">Удалить</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const route = useRoute()
const router = useRouter()
const usernameParam = route.params.username
const notesStore = useNotesStore()
const newNoteContent = ref('')
const newNoteTitle = ref('')
const notes = computed(() => notesStore.notes)
const modal = ref(false)

const openModal = () => {
  modal.value = true
}
const closeModal = () => {
  modal.value = false
}
const deletingNote = (id) => {
  notesStore.deleteNote(id)
}

const addNewNote = () => {
  if (newNoteContent.value.trim() && newNoteTitle.value.trim()) {
    notesStore.addNote(newNoteContent.value.trim(), newNoteTitle.value.trim())
    newNoteContent.value = ''
    newNoteTitle.value = ''
  }

  modal.value = false
}
const logOut = () => {
  router.push('/')
}
</script>

<style scoped>
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
  align-items: right;
  justify-content: right;
  padding: 20px;
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
  margin-right: 10px;
}
</style>
