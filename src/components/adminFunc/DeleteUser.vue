<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-window">
      <div class="modalfig">
        <img src="/public/modalfigure.svg" alt="modalfigure" />
      </div>
      <div class="modal-info">
        <h2>Вы уверены что хотите удалить пользователя?</h2>
        <span class="btn-group">
          <button @click="closeDeleteUserModal" class="btn-otm">Отмена</button>
          <button @click="deletingUserAdmin" class="btn-dob">Удалить</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useAutorizeStore } from '../../stores/autorize'
import { useNotesStore } from '../../stores/notes'

const notesStore = useNotesStore()
const autorizeStore = useAutorizeStore()

const props = defineProps({
  visible: Boolean,
  deleteUserId: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['close'])

const closeDeleteUserModal = (): void => {
  emit('close')
}

const deletingUserAdmin = async () => {
  await autorizeStore.deleteTheUser(props.deleteUserId)
  notesStore.deleteAllNote(props.deleteUserId)
  emit('close')
}
</script>
