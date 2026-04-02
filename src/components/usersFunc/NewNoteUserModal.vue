<template>
  <div v-if="autorizeStore.modal" class="modal-overlay">
    <div class="modal-window">
      <h2>Новая заметка</h2>
      <div>
        <label for="newNoteTitle">Заголовок</label>
        <input v-model="newTitle" id="newNoteTitle" type="text" autocomplete="off" />
      </div>
      <div>
        <label for="newNoteContent">Текст</label>
        <input v-model="newContent" id="newNoteContent" type="text" autocomplete="off" />
      </div>

      <span class="btn-group">
        <button @click="closeModal" class="btn-otm">Отмена</button>
        <button @click="addNewNote" class="btn-dob">Добавить</button>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAutorizeStore } from '../../stores/autorize'
import { useNotesStore } from '../../stores/notes'
import { watch, ref, PropType } from 'vue'
const autorizeStore = useAutorizeStore()
const notesStore = useNotesStore()
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
})

const newTitle = ref(props.newNoteTitle)
const newContent = ref(props.newNoteContent)

watch(
  () => props.newNoteTitle,
  (newVal) => {
    newTitle.value = newVal
  },
)

watch(
  () => props.newNoteContent,
  (newVal) => {
    newContent.value = newVal
  },
)

const closeModal = () => {
  autorizeStore.modal = false
}

const addNewNote = () => {
  if (newContent.value.trim() && newTitle.value.trim()) {
    notesStore.addNote(
      autorizeStore.userLogin.username,
      autorizeStore.userLogin.firstName,
      autorizeStore.userLogin.lastName,
      newTitle.value.trim(),
      newContent.value.trim(),
      autorizeStore.userLogin.role,
      autorizeStore.userLogin.activity,
    )
    newContent.value = ''
    newTitle.value = ''
  }
  // sessionStorage.setItem('notes', JSON.stringify(notes.value))

  autorizeStore.modal = false
}
</script>
