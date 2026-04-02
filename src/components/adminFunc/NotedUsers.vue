<template>
  <div v-if="visible == 'Пользователи'">
    <div>
      <div class="admin-info">
        <p>Списки пользователей</p>
        <button @click="openRegModal && openRegModal()">Зарегестрировать пользоватля +</button>
      </div>
      <ul>
        <div class="users-menu">
          <span>Имя и фамилия пользователя</span>
          <span>Кол-во заметок</span>
          <span>Статус</span>
          <span>Роль</span>
          <span></span>
        </div>
        <li v-for="note in uniqueUsers" :key="note.id" class="users-li">
          <span>{{ note.firstName }} {{ note.lastName }}</span>
          <span>{{ notes.filter((n) => n.username === note.username).length }}</span>
          <span @click="(event) => openChangingActiveModal?.(event, note.username)">
            {{ note.activity }}
            <div v-if="changingactivemodal === note.username" class="drop-users">
              <div @click.stop="closeChangingActiveModal?.('active', note.username)">active</div>
              <div @click.stop="closeChangingActiveModal?.('deactivated', note.username)">
                deactivated
              </div>
            </div>
          </span>
          <span @click="(event) => openChangingRoleModal?.(event, note.username)">
            {{ note.role }}
            <div v-if="changingrolemodal === note.username" class="drop-users">
              <div @click.stop="closeChangingRoleModal?.('user', note.username)">user</div>
              <div @click.stop="closeChangingRoleModal?.('admin', note.username)">admin</div>
              <div @click.stop="closeChangingRoleModal?.('moderator', note.username)">
                moderator
              </div>
            </div>
          </span>
          <span class="users-btns">
            <img
              src="/public/deleteUser.svg"
              alt="deleteuser"
              @click="openUserDeleteModal?.(note.username)"
            />
            <img
              src="/public/editUser.svg"
              alt="edituser"
              @click="openChangeModal?.(note.username)"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { useNotesStore } from '../../stores/notes'
import { Note } from '../../stores/notes'

const notesStore = useNotesStore()
const notes = computed(() => notesStore.notes)

const props = defineProps({
  visible: String,
  openRegModal: Function,
  openChangingActiveModal: Function,
  closeChangingActiveModal: Function,
  openChangingRoleModal: Function,
  closeChangingRoleModal: Function,
  openUserDeleteModal: Function,
  openChangeModal: Function,
  changingactivemodal: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  changingrolemodal: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
})

const uniqueUsers = computed(() => {
  const unique: Note[] = []
  const seen = new Set()
  notes.value.forEach((note) => {
    const userName = `${note.username}`
    if (!seen.has(userName)) {
      seen.add(userName)
      unique.push(note)
    }
  })
  return unique
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

.users-menu {
  padding: 10px;
  background-color: rgba(42, 42, 43, 1);
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: baseline;
}

.users-menu span {
  margin-right: 100px;
  flex: 1;
  text-align: left;
}
.users-li {
  background-color: rgba(42, 42, 43, 1);
  list-style: none;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
}
.users-li span {
  flex: 1;
  text-align: left;
  cursor: pointer;
}
.users-li span.users-btns {
  text-align: right;
}

.drop-users {
  position: absolute;
  background: #fff;
  color: black;
  border: 1px solid #ccc;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.drop-users div {
  padding: 4px 8px;
  cursor: pointer;
}
.users-btns {
  cursor: pointer;
}

.users-btns img {
  cursor: pointer;
}
</style>
