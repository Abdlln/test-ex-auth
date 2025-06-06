import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAutorizeStore = defineStore('autorize', () => {
  const errorMessage = ref('')

  const handleLogin = async (username, password) => {
    errorMessage.value = ''
    try {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      const user = data.users.find((u) => u.username === username)
      console.log('data', data)

      if (!user) {
        errorMessage.value = 'Пользователь не найден'
        return false
      }
      if (password !== user.password) {
        errorMessage.value = 'Неверный пароль'
        return false
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role,
          active: user.active,
        }),
      )
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
      console.log(response)
      return
    }
    const data = await response.json()
    console.log('data is', data)

    return data
  }
  return { errorMessage, handleLogin, handleCreate }
})
