<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-window-reg">
      <h2>Добавление пользователя</h2>
      <div>
        <label>Имя Фамилия</label>
        <input v-model="newuserName" id="newuserName" type="text" autocomplete="off" />
      </div>
      <div>
        <label>Логин</label>
        <input v-model="newuserLog" id="newuserLog" type="text" autocomplete="off" />
      </div>
      <div>
        <label>Пароль</label>
        <input v-model="newuserPass" id="newuserPass" type="password" autocomplete="off" />
      </div>
      <div>
        <label>Повторите пароль</label>
        <input v-model="newuserPassConf" id="newuserPassConf" type="password" autocomplete="off" />
      </div>
      <span class="btn-group">
        <button @click="handleCancel" class="btn-otm">Отмена</button>
        <button @click="registrateUser" class="btn-dob">Добавить</button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAutorizeStore } from '../../stores/autorize'

defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close'])

const autorizeStore = useAutorizeStore()
const newuserLog = ref<string | null>(null)
const newuserName = ref<string | null>(null)
const newuserPass = ref<string | null>(null)
const newuserPassConf = ref<string | null>(null)

const handleCancel = (): void => {
  newuserLog.value = ''
  newuserName.value = ''
  newuserPass.value = ''
  newuserPassConf.value = ''
  emit('close')
}

const registrateUser = async (): Promise<void> => {
  if (
    newuserLog.value &&
    newuserName.value &&
    newuserPass.value &&
    newuserPassConf.value &&
    newuserLog.value.trim() &&
    newuserName.value.trim() &&
    newuserPass.value.trim() &&
    newuserPassConf.value.trim()
  ) {
    const parts = newuserName.value.trim().split(' ')
    const newuserFirst = parts[0]
    const newuserLast = parts[1]
    const errorLast = parts[2]
    if (errorLast) {
      window.alert('введите только имя и фамилию ')
      emit('close')
    }
    if (newuserFirst && newuserLast && newuserPass.value === newuserPassConf.value && !errorLast) {
      await autorizeStore.adminHandleCreate(
        newuserLog.value.trim(),
        newuserPass.value.trim(),
        newuserFirst.trim(),
        newuserLast.trim(),
        'user',
      )
      newuserLog.value = ''
      newuserName.value = ''
      newuserPass.value = ''
      newuserPassConf.value = ''
    }

    if (newuserPass.value.trim() !== newuserPassConf.value.trim()) {
      window.alert('пароли не совпадают')
      handleCancel()
    }
  }
  emit('close')
}
</script>

<style>
.btn-dob {
  height: 44px;
  width: 360px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 95, 249, 1);
  color: white;
}
.btn-otm {
  height: 44px;
  width: 360px;
  border-radius: 5px;
  border: none;
  background-color: rgba(24, 24, 25, 1);
  color: white;
}
.btn-group {
  display: flex;
  gap: 12px;
}
.btn-group button {
  cursor: pointer;
}
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
.modal-window button {
  flex: 1;
  margin: 5px;
}
.modal-window > div {
  display: flex;
  flex-direction: column;
}
.modal-window button {
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
.modal-window-reg > div {
  display: flex;
  flex-direction: column;
}
</style>
