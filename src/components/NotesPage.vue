<template>
  <div class="notes-page">
    <div class="quit-btn">
      <p class="user-info" v-if="users">{{ users.firstName }} {{ users.lastName }}</p>
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

    <div v-if="editmodal" class="modal-overlay">
      <div class="modal-window">
        <h2>Новая заметка</h2>
        <div>
          <label for="newNoteTitle">Заголовок</label>
          <input value="userTitle" v-model="newNoteTitle" id="newNoteTitle" type="text" />
        </div>
        <div>
          <label for="newNoteContent">Текст</label>
          <input value="userText" v-model="newNoteContent" id="newNoteContent" type="text" />
        </div>
        <span class="btn-group">
          <button @click="closeEditModal" class="btn-otm">Отмена</button>
          <button @click="EditNote" class="btn-dob">Изменить</button>
        </span>
      </div>
    </div>

    <h3>Мои заметки</h3>
    <div class="user-notes">
      <ul class="notes-ul">
        <li v-for="note in userNotes" :key="note.id" class="notes-li">
          <h2 class="notes-title">{{ note.title }}</h2>
          <div class="notes-text">
            <p>{{ note.content }}</p>
          </div>
          <div class="notes-buttons">
            <h3 class="delete-btn" @click="deletingNote(note.id)">Удалить</h3>
            <h3 class="edit-btn" @click="editingNote(note.id)">Изменить</h3>
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
const newNoteContent = ref('')
const newNoteTitle = ref('')
const notes = computed(() => notesStore.notes)
const users = computed(() => autorizeStore.userLogin)
const modal = ref(false)
const editmodal = ref(false)
const editId = ref('')

const userNotes = computed(() => {
  return notes.value.filter((note) => note.username === users.value.username)
})

onMounted(() => {
  const savedNotes = sessionStorage.getItem('notes')

  if (savedNotes !== null) {
    notesStore.setNotes(JSON.parse(savedNotes))
  }
})
const openModal = () => {
  newNoteContent.value = ''

  newNoteTitle.value = ''

  modal.value = true
}

const closeModal = () => {
  modal.value = false
}

const closeEditModal = () => {
  editmodal.value = false
}
const deletingNote = (id) => {
  notesStore.deleteNote(id)
  sessionStorage.setItem('notes', JSON.stringify(notes.value))
}

const editingNote = (id) => {
  const note = notes.value.filter((n) => n.id === id)
  if (note) {
    newNoteContent.value = note[0].content

    newNoteTitle.value = note[0].title
    editId.value = id

    editmodal.value = true
  }
}

const EditNote = async () => {
  if (newNoteContent.value.trim() && newNoteTitle.value.trim()) {
    const newCont = newNoteContent.value
    const newTitle = newNoteTitle.value
    await notesStore.putNotes(editId.value, newCont, newTitle)
    sessionStorage.setItem('notes', JSON.stringify(notes.value))
    editmodal.value = false
  }
}

const addNewNote = () => {
  if (newNoteContent.value.trim() && newNoteTitle.value.trim()) {
    notesStore.addNote(
      autorizeStore.userLogin.username,
      autorizeStore.userLogin.firstName,
      autorizeStore.userLogin.lastName,
      newNoteTitle.value.trim(),
      newNoteContent.value.trim(),
      autorizeStore.userLogin.role,
    )
    newNoteContent.value = ''
    newNoteTitle.value = ''
  }
  sessionStorage.setItem('notes', JSON.stringify(notes.value))

  modal.value = false
}

const logOut = () => {
  router.push('/')
}
</script>

<style scoped>
.user-notes {
  display: flex;
  flex-wrap: wrap;
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
  align-items: right;
  justify-content: right;
  padding: 20px;
}

.notes-add {
  display: flex;
  justify-content: space-between;
}

.notes-buttons {
  align-items: center;
  display: flex;
  margin-top: 300px;
}

.add-btn {
  background-color: rgba(0, 95, 249, 1);
  color: white;
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
}
.edit-btn {
  margin-top: 300px;
  cursor: pointer;
  color: white;
  margin-top: 20px;
  width: 100px;
  justify-content: center;
  display: inline-flex;
}
.delete-btn {
  margin-top: 300px;
  cursor: pointer;
  color: red;
  margin-top: 20px;
  width: 100px;
  justify-content: center;
  display: inline-flex;
}
.notes-page {
  margin: 0 auto;
  max-width: 66%;
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
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}

.notes-li {
  background-color: rgba(42, 42, 43, 1);
  list-style: none;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 364px;
  height: 450px;
}

.notes-text p {
  color: rgba(154, 154, 154, 1);
}
.notes-title {
  padding: 15px;
}
.quit-img {
  cursor: pointer;
}

.user-info {
  margin-right: 10px;
}
</style>
