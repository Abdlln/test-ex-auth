<template>
  <div v-if="autorizeStore.editmodal" class="modal-overlay">
    <div class="modal-window">
      <h2>Новая заметка</h2>
      <div>
        <label for="newNoteTitle">Заголовок</label>
        <input
          value="userTitle"
          v-model="newTitle"
          id="newNoteTitle"
          type="text"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="newNoteContent">Текст</label>
        <input
          value="userText"
          v-model="newContent"
          id="newNoteContent"
          type="text"
          autocomplete="off"
        />
      </div>
      <span class="btn-group">
        <button @click="closeEditModal" class="btn-otm">Отмена</button>
        <button @click="EditNote" class="btn-dob">Изменить</button>
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
  editId: {
    type: Number as PropType<number | null>,
    required: false,
    default: null,
  },
})

const newTitle = ref<string | null>(props.newNoteTitle)
const newContent = ref<string | null>(props.newNoteContent)

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

const closeEditModal = () => {
  autorizeStore.editmodal = false
}

const EditNote = async () => {
  if (newContent.value.trim() && newTitle.value.trim()) {
    const newCont = newContent.value
    const newTitl = newTitle.value
    await notesStore.putNotes(props.editId, newCont, newTitl)
    // sessionStorage.setItem('notes', JSON.stringify(notes.value))
    autorizeStore.editmodal = false
  }
}
</script>
