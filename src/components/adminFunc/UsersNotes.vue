<template>
  <div v-if="visible == 'Заметки пользователей'">
    <div class="admin-info">
      <p>Заметки пользователей</p>
    </div>
    <ul class="notes-ul">
      <li v-for="note in notes" :key="note.id" class="notes-li">
        <h2>{{ note.title }}</h2>
        <p>Пользователь: {{ note.firstName }} {{ note.lastName }}</p>
        <div>
          <p>{{ note.content }}</p>
        </div>
        <div class="notes-buttons">
          <h3 @click="openDeleteModal?.(note.id)" class="delete-btn">Удалить</h3>
          <h3 @click="editingNote?.(note.id)" class="edit-btn">Изменить</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { useNotesStore } from '../../stores/notes'
const notesStore = useNotesStore()
const notes = computed(() => notesStore.notes)

const props = defineProps({
  visible: String,
  openDeleteModal: Function as PropType<(id: number) => void>,
  editingNote: Function,
})
</script>

<style>
.admin-info {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  padding: 20px;
}
.admin-info p {
  margin-right: 20px;
}
.admin-info button {
  width: 315px;
  height: 44px;
  color: white;
  background-color: rgba(0, 95, 249, 1);
  border-radius: 10px;
  cursor: pointer;
}
.notes-ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}
.notes-li {
  background-color: rgba(42, 42, 43, 1);
  list-style: none;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 364px;
  height: 450px;
}
.notes-buttons {
  align-items: center;
  display: flex;
  margin-top: 300px;
}

.delete-btn {
  cursor: pointer;
  color: red;
  margin-top: 20px;
  width: 100px;
  justify-content: center;
  display: inline-flex;
}

.edit-btn {
  margin-top: 300px;
  cursor: pointer;
  color: white;
  margin-top: 20px;
  width: 100px;
  justify-content: center;
  display: inline-flex;
}
</style>
