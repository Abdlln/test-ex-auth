import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const stored = sessionStorage.getItem('notes')
  const notes = ref([])
  if (stored !== null) {
    try {
      notes.value = JSON.parse(stored)
    } catch (e) {
      console.error('Ошибка парсинга sessionStorage:', e)
    }
  }
  watch(
    notes,
    (newNotes) => {
      sessionStorage.setItem('notes', JSON.stringify(newNotes))
    },
    { deep: true },
  )

  const addNote = (username, firstName, lastName, title, content, role) => {
    notes.value.push({ id: Date.now(), username, firstName, lastName, title, content, role })
  }

  const deleteNote = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  const setNotes = (newNotes) => {
    notes.value = newNotes
  }

  const putNotes = async (id, content, title) => {
    notes.value = notes.value.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: title,
          content: content,
        }
      }
      return note
    })
  }

  return { notes, addNote, deleteNote, setNotes, putNotes }
})
