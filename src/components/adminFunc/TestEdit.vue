<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-window-reg">
      <h2>Редактирование пользователя</h2>
      <div>
        <label for="userName">Имя Фамилия</label>
        <input v-model="changeuserName" id="changeuserName" type="text" autocomplete="off" />
      </div>
      <div>
        <label for="newNoteContent">Логин</label>
        <input v-model="changeuserLog" id="changeuserLog" type="text" autocomplete="off" />
      </div>
      <div>
        <label for="newNoteContent">Пароль</label>
        <input v-model="changeuserPass" id="changeuserPass" type="password" autocomplete="off" />
      </div>
      <div>
        <label for="newNoteContent">Повторите пароль</label>
        <input
          v-model="changeuserPassConf"
          id="newuserPassConf"
          type="password"
          autocomplete="off"
        />
      </div>
      <span class="btn-group">
        <button @click="emit('close')" class="btn-otm">Отмена</button>
        <button @click="changingUser" class="btn-dob">Изменить</button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { useAutorizeStore } from '../../stores/autorize'
import { useNotesStore } from '../../stores/notes'

const props = defineProps({
  visible: Boolean,
  userData: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  changeName: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  changeLog: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  changePass: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['close', 'updateUser'])

const autorizeStore = useAutorizeStore()
const notesStore = useNotesStore()

const changeuserName = ref<string | null>(props.changeName)
const changeuserLog = ref<string | null>(props.changeLog)
const changeuserPass = ref<string | null>(props.changePass)
const changeuserPassConf = ref<string | null>(null)

watch(
  () => props.changeName,
  (newVal) => {
    changeuserName.value = newVal
  },
)
watch(
  () => props.changeLog,
  (newVal) => {
    changeuserLog.value = newVal
  },
)
watch(
  () => props.changePass,
  (newVal) => {
    changeuserPass.value = newVal
  },
)

async function changingUser(): Promise<void> {
  if (
    changeuserName.value &&
    changeuserLog.value &&
    changeuserPass.value &&
    changeuserName.value.trim() &&
    changeuserLog.value.trim() &&
    changeuserPass.value.trim()
  ) {
    const parts = changeuserName.value.trim().split(' ')
    const newFirstname = parts[0]
    const newLastname = parts[1]
    const errorLast = parts[2]
    if (errorLast) {
      window.alert('введите только имя и фамилию')
      emit('close')
    }
    if (
      changeuserPassConf.value &&
      changeuserPass.value.trim() !== changeuserPassConf.value.trim()
    ) {
      window.alert('пароли не совпадают')
    }
    if (newFirstname && newLastname) {
      await autorizeStore.changeUserInfo(
        props.userData,
        newFirstname,
        newLastname,
        changeuserLog.value,
        changeuserPass.value,
      )
      await notesStore.putNotesInfo(props.userData, newFirstname, newLastname, changeuserLog.value)
    }

    emit('close')
  }
}
</script>

<style scoped></style>
