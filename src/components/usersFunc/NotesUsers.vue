<template>
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
</template>

<script setup lang="ts">
import { useAutorizeStore } from '../../stores/autorize'
import { useNotesStore } from '../../stores/notes'
import { computed, PropType } from 'vue'
import { User } from '../../stores/autorize'
import { Note } from '../../stores/notes'
const autorizeStore = useAutorizeStore()
const notesStore = useNotesStore()
const notes = computed<Note[] | null>(() => notesStore.notes)
const users = computed<User | null>(() => autorizeStore.userLogin)

const userNotes = computed<Note[]>(() => {
  if (notes.value !== null && users.value !== null) {
    const user = users.value as User
    return notes.value.filter((note) => note.username === user.username)
  }
  return []
})

const props = defineProps({
  newNoteTitle: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  newNoteContent: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  editingNote: Function,
})

const deletingNote = (id: number | null) => {
  notesStore.deleteNote(id)
  sessionStorage.setItem('notes', JSON.stringify(notes.value))
}
</script>
