import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAutorizeStore = defineStore('autorize', () => {
  const errorMessage = ref('')
  const userLogin = ref({})

  const setUsers = (newUsers) => {
    userLogin.value = newUsers
  }

  const handleLogin = async (username, password) => {
    errorMessage.value = ''
    try {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      userLogin.value = data.users.find((u) => u.username === username)
      if (!userLogin.value) {
        errorMessage.value = 'Пользователь не найден'
        return false
      }

      if (password !== userLogin.value.password) {
        errorMessage.value = 'Неверный пароль'
        return false
      }

      return true
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Ошибка при входе. Попробуйте позже.'
      return false
    }
  }

  const handleCreate = async (username, password, firstname, secondname) => {
    errorMessage.value = ''
    const newuser = {
      id: Date.now(),
      firstName: firstname,
      lastName: secondname,
      username: username,
      password: password,
    }
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newuser),
    })

    if (!response.ok) {
      errorMessage.value = 'Не получилось авторизоваться'
      return
    }
    const data = await response.json()
    userLogin.value = {
      id: data.id,
      firstName: firstname,
      lastName: secondname,
      username: username,
      password: password,
    }
    return data
  }
  return { errorMessage, handleLogin, handleCreate, userLogin, setUsers }
})
