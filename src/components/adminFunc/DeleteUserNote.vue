<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-window">
      <div class="modalfig">
        <img src="/public/modalfigure.svg" alt="modalfigure" />
      </div>
      <div class="modal-info">
        <h2>Вы уверены что хотите удалить заметку?</h2>
        <span class="btn-group">
          <button @click="closeDeleteModal" class="btn-otm">Отмена</button>
          <button @click="deletingNote" class="btn-dob">Удалить</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useNotesStore } from '../../stores/notes'

const notesStore = useNotesStore()

const props = defineProps({
  visible: Boolean,
  deleteId: {
    type: Number as PropType<number | null>,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['close'])

const deletingNote = (): void => {
  notesStore.deleteNote(props.deleteId)
  emit('close')
}

const closeDeleteModal = (): void => {
  emit('close')
}
</script>

<style>
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
.modal-window button {
  flex: 1;
  margin: 5px;
}
.modal-window > div {
  display: flex;
  flex-direction: column;
}
.modal-window-reg > div {
  display: flex;
  flex-direction: column;
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

.modalfig {
  display: flex;
  width: 100%;
  justify-content: center;
}

.modalfig img {
  max-width: 48px;
  height: auto;
  align-self: center;
}

.modal-info {
  margin-top: 50px;
}
.modal-info h2 {
  margin-bottom: 40px;
}

.btn-group {
  display: flex;
  gap: 12px;
}
.btn-group button {
  cursor: pointer;
}

.btn-otm {
  height: 44px;
  width: 360px;
  border-radius: 5px;
  border: none;
  background-color: rgba(24, 24, 25, 1);
  color: white;
}
.btn-dob {
  height: 44px;
  width: 360px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 95, 249, 1);
  color: white;
}
</style>
