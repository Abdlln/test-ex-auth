import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])
  const addNote = (content, title) => {
    notes.value.push({ id: Date.now(), title, content })
  }
  const deleteNote = (id) => {
    console.log('deleting note with id', id)

    notes.value = notes.value.filter((note) => note.id !== id)
  }
  return { notes, addNote, deleteNote }
})
