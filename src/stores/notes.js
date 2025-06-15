import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  const addNote = (username, firstName, lastName, title, content, role) => {
    notes.value.push({ id: Date.now(), username, firstName, lastName, title, content, role })
  }

  const deleteNote = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  const setNotes = (newNotes) => {
    notes.value = newNotes
  }

  return { notes, addNote, deleteNote, setNotes }
})
