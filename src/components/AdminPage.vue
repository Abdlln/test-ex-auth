<template>
  <div class="notes-page">
    <HeaderElement @update:menu="handleMenuUpdate" />

    <UsersNotes
      :visible="currentMenu"
      :openDeleteModal="openDeleteModal"
      :editingNote="editingNote"
    />

    <NotedUsers
      :visible="currentMenu"
      :openRegModal="openRegModal"
      :openChangingActiveModal="openChangingActiveModal"
      :closeChangingActiveModal="closeChangingActiveModal"
      :openChangingRoleModal="openChangingRoleModal"
      :closeChangingRoleModal="closeChangingRoleModal"
      :openUserDeleteModal="openUserDeleteModal"
      :openChangeModal="openChangeModal"
      :changingactivemodal="changingactivemodal"
      :changingrolemodal="changingrolemodal"
    />

    <EditingUser
      :visible="changemodal"
      :userData="changeUserId"
      :changeName="changeuserName"
      :changeLog="changeuserLog"
      :changePass="changeuserPass"
      @close="closeChangeModal"
    />

    <RegistrateUser :visible="regmodal" @close="closeRegModal" />

    <EditingNoteUser
      :visible="editmodal"
      :changenoteId="editId"
      :changeTitle="newNoteTitle"
      :changeContent="newNoteContent"
      @close="closeEditModal"
    />

    <DeleteUserNote :visible="deletemodal" :editId="editId" @close="closeDeleteModal" />

    <DeleteUser
      :visible="deleteUsermodal"
      :deleteUserId="deleteUserId"
      @close="closeDeleteUserModal"
    />
  </div>
</template>

<script setup lang="ts">
import RegistrateUser from './adminFunc/RegistrateUser.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useNotesStore } from '../stores/notes'
import { useAutorizeStore } from '../stores/autorize'
import EditingUser from './adminFunc/EditingUser.vue'
import EditingNoteUser from './adminFunc/EditingNoteUser.vue'
import HeaderElement from './adminFunc/HeaderElement.vue'
import UsersNotes from './adminFunc/UsersNotes.vue'
import NotedUsers from './adminFunc/NotedUsers.vue'
import DeleteUserNote from './adminFunc/DeleteUserNote.vue'
import DeleteUser from './adminFunc/DeleteUser.vue'
import { Note } from '../stores/notes'
import { User } from '../stores/autorize'
const autorizeStore = useAutorizeStore()
const notesStore = useNotesStore()
const notes = computed<Note[]>(() => notesStore.notes)
const siteUsers = computed<User[]>(() => autorizeStore.users)
const currentMenu = ref<string>('Пользователи')
const editmodal = ref<boolean>(false)
const newNoteContent = ref<string | null>(null)
const newNoteTitle = ref<string | null>(null)
const editId = ref<number | null>(null)
const deletemodal = ref<boolean>(false)
const deleteId = ref<number | null>(null)
const deleteUserId = ref<string | null>(null)
const deleteUsermodal = ref<boolean>(false)
const regmodal = ref<boolean>(false)
const newuserName = ref<string | null>(null)
const newuserLog = ref<string | null>(null)
const newuserPass = ref<string | null>(null)
const newuserPassConf = ref<string | null>(null)
const changeuserName = ref<string | null>(null)
const changeuserLog = ref<string | null>(null)
const changeuserPass = ref<string | null>(null)
const changeuserPassConf = ref<string | null>(null)
const changemodal = ref<boolean>(false)
const changeUserId = ref<string | null>(null)
const changingrolemodal = ref<string | null>(null)
const currentModalRef = ref<HTMLElement | null>(null)
const currentModalActivity = ref<HTMLElement | null>(null)
const changingactivemodal = ref<string | null>(null)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('click', handleClickOutsideActivity)
})

onMounted(async () => {
  await autorizeStore.getUsers()
  autorizeStore.getUserLogin()
})

onMounted(() => {
  const savedNotes: string | null = sessionStorage.getItem('notes')
  if (savedNotes !== null) {
    notesStore.setNotes(JSON.parse(savedNotes))
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('click', handleClickOutsideActivity)
})

const handleClickOutside = (event: MouseEvent): void => {
  if (
    changingrolemodal.value &&
    currentModalRef.value &&
    !currentModalRef.value.contains(event.target as Node)
  ) {
    changingrolemodal.value = null
  }
}
const handleClickOutsideActivity = (event: MouseEvent): void => {
  if (
    changingactivemodal.value &&
    currentModalActivity.value &&
    !currentModalActivity.value.contains(event.target as Node)
  ) {
    changingactivemodal.value = null
  }
}

const handleMenuUpdate = (menu: string): void => {
  currentMenu.value = menu
}

const openChangingRoleModal = (event: MouseEvent, username: string): void => {
  changingrolemodal.value = username
  currentModalRef.value = (event.target as HTMLElement).closest('.users-li')
}

const openChangingActiveModal = (event: MouseEvent, username: string): void => {
  changingactivemodal.value = username

  currentModalActivity.value = (event.target as HTMLElement).closest('.users-li')
}

const closeChangingRoleModal = (role: string, username: string): void => {
  autorizeStore.changeUserRole(role, username)
  notesStore.changeNotesRole(role, username)
  changingrolemodal.value = null
}

const closeChangingActiveModal = async (activity: string, username: string): Promise<void> => {
  await autorizeStore.changeUserActivity(activity, username)
  notesStore.changeNotesActivity(activity, username)
  changingactivemodal.value = null
}

const editingNote = (id: number): void => {
  const note = notes.value.filter((n) => n.id === id)
  if (note[0]) {
    newNoteContent.value = note[0].content
    newNoteTitle.value = note[0].title
    editId.value = id
    editmodal.value = true
  }
}

const closeDeleteModal = (): void => {
  deletemodal.value = false
}
const closeEditModal = (): void => {
  editmodal.value = false
}
const closeRegModal = (): void => {
  regmodal.value = false
}

const closeChangeModal = () => {
  changemodal.value = false
}
const openDeleteModal = (id: number): void => {
  deletemodal.value = true
  deleteId.value = id
}
const openRegModal = (): void => {
  newuserLog.value = ''
  newuserName.value = ''
  newuserPass.value = ''
  newuserPassConf.value = ''
  regmodal.value = true
}

const openUserDeleteModal = (username: string): void => {
  deleteUsermodal.value = true
  deleteUserId.value = username
}

const openChangeModal = (id: string): void => {
  const user = notes.value.filter((use) => use.username === id)
  const pass = siteUsers.value.filter((use) => use.username === id)
  if (user[0] && pass[0]) {
    changeuserName.value = user[0].firstName + ' ' + user[0].lastName
    changeuserLog.value = user[0].username
    changeuserPass.value = pass[0].password ?? null
    changeuserPassConf.value = pass[0].password ?? null
    changeUserId.value = id
  }
  changemodal.value = true
}

const closeDeleteUserModal = (): void => {
  deleteUsermodal.value = false
}
</script>

<style scoped>
.user-notes {
  display: flex;
  flex-wrap: wrap;
}

.users-admin {
  display: flex;
  gap: 20px;
}

.users-admin p {
  display: inline;

  margin-right: 20px;
}

.notes-add {
  display: flex;
  justify-content: space-between;
}
.add-btn {
  background-color: rgba(0, 95, 249, 1);
  color: white;
  border-radius: 5px;
  border: none;
  padding: 5px;
}

.delete-btn-users {
  cursor: pointer;
  color: red;
  margin-top: 20px;
  width: 50px;
  justify-content: center;
  display: inline-flex;
}
.edit-btn-users {
  margin-top: 300px;
  cursor: pointer;
  color: white;
  margin-top: 20px;
  width: 50px;
  justify-content: center;
  display: inline-flex;
}

.notes-page {
  margin: 0 auto;
  max-width: 70%;
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

.modal-window-reg {
  background-color: rgba(42, 42, 43, 1);
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 600px;
  padding: 20px;
  text-align: center;
  overflow-y: auto;
  outline: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
}
.modal-window button {
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  align-items: center;
  justify-content: center;
  height: 35px;
}
</style>
