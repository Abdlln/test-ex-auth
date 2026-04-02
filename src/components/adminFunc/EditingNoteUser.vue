<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-window">
      <h2>Новая заметка</h2>
      <div>
        <label for="changeNoteTitle">Заголовок</label>
        <input v-model="changeNoteTitle" id="changeNoteTitle" type="text" autocomplete="off" />
      </div>
      <div>
        <label for="changeNoteContent">Текст</label>
        <input v-model="changeNoteContent" id="changeNoteContent" type="text" autocomplete="off" />
      </div>
      <span class="btn-group">
        <button @click="emit('close')" class="btn-otm">Отмена11</button>
        <button @click="EditNote" class="btn-dob">Изменить11</button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNotesStore } from '../../stores/notes'
const props = defineProps({
  visible: Boolean,
  changenoteId: null,
  changeTitle: null,
  changeContent: null,
})
const emit = defineEmits(['close'])
const notesStore = useNotesStore()

const changeNoteTitle = ref(props.changeTitle)
const changeNoteContent = ref(props.changeContent)

watch(
  () => props.changeTitle,
  (newVal) => {
    changeNoteTitle.value = newVal
  },
)
watch(
  () => props.changeContent,
  (newVal) => {
    changeNoteContent.value = newVal
  },
)

const EditNote = async (): Promise<void> => {
  if (changeNoteContent.value.trim() && changeNoteTitle.value.trim()) {
    const newCont = changeNoteContent.value
    const newTitle = changeNoteTitle.value

    console.log('newCont', newCont)
    console.log('newTitle', newTitle)
    await notesStore.putNotes(props.changenoteId, newCont, newTitle)

    emit('close')
    // sessionStorage.setItem('notes', JSON.stringify(notes.value))
  }
}
</script>
