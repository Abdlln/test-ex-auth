<template>
  <div class="notes-page">
    <HeaderElementUser :openModal="openModal" />

    <NewNoteUserModal :newNoteTitle="newNoteTitle" :newNoteContent="newNoteContent" />

    <ChangeNoteUserModal
      :newNoteTitle="newNoteTitle"
      :newNoteContent="newNoteContent"
      :editId="editId"
    />
    <NotesUsers
      :newNoteTitle="newNoteTitle"
      :newNoteContent="newNoteContent"
      :editingNote="editingNote"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotesStore } from '../stores/notes'
import { useAutorizeStore } from '../stores/autorize'
import HeaderElementUser from './usersFunc/HeaderElementUser.vue'
import NewNoteUserModal from './usersFunc/NewNoteUserModal.vue'
import ChangeNoteUserModal from './usersFunc/ChangeNoteUserModal.vue'
import NotesUsers from './usersFunc/NotesUsers.vue'

const autorizeStore = useAutorizeStore()

const notesStore = useNotesStore()
const newNoteContent = ref<string | null>(null)
const newNoteTitle = ref<string | null>(null)
const notes = computed(() => notesStore.notes)
const editId = ref<number | null>(null)

onMounted(() => {
  autorizeStore.getUserLogin()
})

onMounted(() => {
  const savedNotes: string | null = sessionStorage.getItem('notes')
  console.log('first', notes.value)
  if (savedNotes !== null) {
    notesStore.setNotes(JSON.parse(savedNotes))
  }
})

const openModal = () => {
  newNoteContent.value = ''
  newNoteTitle.value = ''
  autorizeStore.modal = true
}

const editingNote = (id: number) => {
  const note = notes.value.filter((n) => n.id === id)
  if (note[0]) {
    newNoteContent.value = note[0].content
    newNoteTitle.value = note[0].title
    editId.value = id
    autorizeStore.editmodal = true
  }
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

.notes-buttons {
  align-items: center;
  display: flex;
  margin-top: 300px;
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
