import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Note {
  id: number
  username: string | null
  firstName: string | null
  lastName: string | null
  title: string | null
  content: string | null
  role: string | null
  activity: string | null
}

export const useNotesStore = defineStore('notes', () => {
  const stored = sessionStorage.getItem('notes')
  const notes = ref<Note[]>([])
  if (stored !== null) {
    try {
      notes.value = JSON.parse(stored) as Note[]
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

  const addNote = (
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    title: string | null,
    content: string | null,
    role: string | null,
    activity: string | null,
  ): void => {
    notes.value.push({
      id: Date.now(),
      username,
      firstName,
      lastName,
      title,
      content,
      role,
      activity,
    })
  }

  const deleteNote = (id: number | null) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }
  const deleteAllNote = (username: string | null) => {
    notes.value = notes.value.filter((note) => note.username !== username)
  }

  const setNotes = (newNotes: Note[]) => {
    notes.value = newNotes
  }
  const changeNotesRole = (userrole: string | null, username: string | null) => {
    notes.value = notes.value.map((note) => {
      if (note.username === username) {
        return { ...note, role: userrole }
      }
      return note
    })
  }
  const changeNotesActivity = (activity: string | null, username: string | null) => {
    notes.value = notes.value.map((note) => {
      if (note.username === username) {
        return { ...note, activity: activity }
      }
      return note
    })
  }

  const putNotes = async (
    username: number | null,
    content: string | null,
    title: string | null,
  ) => {
    notes.value = notes.value.map((note) => {
      if (note.id === username) {
        return {
          ...note,
          title: title,
          content: content,
        }
      }
      return note
    })
  }
  const putNotesInfo = async (
    id: string | null,
    firstName: string | null,
    lastName: string | null,
    username: string | null,
  ) => {
    notes.value = notes.value.map((note) => {
      if (note.username === id) {
        return {
          ...note,
          firstName: firstName,
          lastName: lastName,
          username: username,
        }
      }
      return note
    })
  }

  return {
    notes,
    addNote,
    deleteNote,
    setNotes,
    putNotes,
    deleteAllNote,
    changeNotesRole,
    putNotesInfo,
    changeNotesActivity,
  }
})
