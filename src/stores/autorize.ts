import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  id: number
  firstName: string | null
  lastName: string | null
  username: string | null
  activity?: string | null
  role?: string | null
  password?: string | null
}

export const useAutorizeStore = defineStore('autorize', () => {
  const errorMessage = ref<string>('')
  const userLogin = ref<User | null>(null)
  const users = ref<User[]>([])
  const modal = ref<boolean>(false)
  const editmodal = ref<boolean>(false)
  const isLogin = ref<boolean>(false)
  const infoText = computed(() => (isLogin.value ? 'Авторизуйтесь' : 'Введите ваш логин и пароль'))
  const infoButton = computed(() => (isLogin.value ? 'Регистрация' : 'Войти'))
  const linkAccountText = computed(() => (isLogin.value ? 'Войдите в него' : 'Создайте сейчас'))
  const subFormText = computed(() => (isLogin.value ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'))

  const getUsers = async (): Promise<void> => {
    const storedUsers = sessionStorage.getItem('users')
    if (storedUsers) {
      users.value = JSON.parse(storedUsers) as User[]
    } else {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      users.value = data.users as User[]
      users.value.forEach((user) => {
        user.activity = 'active'
      })
      sessionStorage.setItem('users', JSON.stringify(users.value))
    }
  }

  const getUserLogin = (): void => {
    const storedUserLogin = sessionStorage.getItem('userLogin')
    if (storedUserLogin) {
      userLogin.value = JSON.parse(storedUserLogin) as User
    }
  }

  const changeUserActivity = async (activity: string, username: string): Promise<void> => {
    errorMessage.value = ''
    const userId = users.value.find((user) => user.username === username)
    // try {
    // const response = await fetch(`https://dummyjson.com/users/${userId.id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     role: userrole,
    //   }),
    // })
    // if (!response.ok) {
    //   errorMessage.value = 'Не получилось изменить роль пользователя'
    //   return
    // }
    if (!userId) {
      errorMessage.value = 'polzovatel` ne naiden'
      return
    }
    users.value = users.value.map((use) => {
      if (use.id === userId.id) {
        return { ...use, activity: activity }
      }
      return use
    })
    sessionStorage.setItem('users', JSON.stringify(users.value))
    // } catch (error) {
    //   errorMessage.value = 'Произошла ошибка при удалении пользователя'
    //   console.error(error)
    // }
  }

  // const setUsers = (newUsers) => {
  //   userLogin.value = newUsers
  // }

  const logOut = () => {
    errorMessage.value = ''
  }

  const handleLogin = async (username: string, password: string) => {
    const response = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      }),
    })
    try {
      userLogin.value = users.value.find((u) => u.username === username) ?? null
      sessionStorage.setItem('userLogin', JSON.stringify(userLogin.value))
      if (!userLogin.value) {
        errorMessage.value = 'Пользователь не найден'
        return false
      }
      if (userLogin.value.activity === 'deactivated') {
        errorMessage.value = 'Пользователь деактивирован'
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

  const deleteTheUser = async (username: string | null): Promise<void> => {
    errorMessage.value = ''
    const userId = users.value.find((user) => user.username === username)
    if (!userId) {
      errorMessage.value = 'polzovatel` ne naiden'
      return
    }
    // try {
    const response = await fetch(`https://dummyjson.com/users/${userId.id}`, {
      method: 'DELETE',
    })
    // if (!response.ok) {
    //   errorMessage.value = 'Не получилось удалить пользователя'
    //   console.log('userID', userId.id)
    //   return
    // }

    users.value = users.value.filter((use) => use.id !== userId.id)
    sessionStorage.setItem('users', JSON.stringify(users.value))
    // }
    // catch (error) {
    //   errorMessage.value = 'Произошла ошибка при удалении пользователя'
    //   console.error(error)
    // }
  }

  const changeUserRole = async (userrole: string, username: string): Promise<void> => {
    errorMessage.value = ''
    const userId = users.value.find((user) => user.username === username)
    if (!userId) {
      errorMessage.value = 'polzovatel` ne naiden'
      return
    }
    // try {
    const response = await fetch(`https://dummyjson.com/users/${userId.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: userrole,
      }),
    })
    // if (!response.ok) {
    //   errorMessage.value = 'Не получилось изменить роль пользователя'
    //   return
    // }

    users.value = users.value.map((use) => {
      if (use.id === userId.id) {
        return { ...use, role: userrole }
      }
      return use
    })
    sessionStorage.setItem('users', JSON.stringify(users.value))
    // } catch (error) {
    //   errorMessage.value = 'Произошла ошибка при удалении пользователя'
    //   console.error(error)
    // }
  }

  const changeUserInfo = async (
    username: string | null,
    firstName: string,
    lastName: string | null,
    log: string | null,
    pass: string | null,
  ): Promise<void> => {
    errorMessage.value = ''
    const userId = users.value.find((user) => user.username === username)
    if (!userId) {
      errorMessage.value = 'polzovatel` ne naiden'
      return
    }
    // try {
    const response = await fetch(`https://dummyjson.com/users/${userId.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: log,
        password: pass,
      }),
    })
    // if (!response.ok) {
    //   errorMessage.value = 'Не получилось изменить роль пользователя'
    //   return
    // }

    users.value = users.value.map((use) => {
      if (use.id === userId.id) {
        // use.firstName = firstName
        // use.lastName = lastName
        // use.username = log
        // use.password = pass
        return {
          ...use,
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: pass,
        }
      }
      return use
    })
    console.log('users', users.value)
    sessionStorage.setItem('users', JSON.stringify(users.value))
    // } catch (error) {
    //   errorMessage.value = 'Произошла ошибка при удалении пользователя'
    //   console.error(error)
    // }
  }
  const handleCreate = async (
    username: string,
    password: string,
    firstname: string,
    secondname: string,
    userrole: string,
  ): Promise<boolean> => {
    errorMessage.value = ''
    const newuser = {
      id: Date.now(),
      firstName: firstname,
      lastName: secondname,
      username: username,
      password: password,
      role: userrole,
    }
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newuser),
    })

    if (!response.ok) {
      errorMessage.value = 'Не получилось авторизоваться'
      return false
    }
    const data = await response.json()

    const craetedUser = {
      ...data,
      firstName: firstname,
      lastName: secondname,
      username: username,
      password: password,
      role: userrole,
    }

    users.value.push(craetedUser)

    sessionStorage.setItem('users', JSON.stringify(users.value))

    userLogin.value = craetedUser
    sessionStorage.setItem('userLogin', JSON.stringify(userLogin.value))
    return true
  }

  const adminHandleCreate = async (
    username: string,
    password: string,
    firstname: string,
    secondname: string,
    userrole: string,
  ): Promise<void> => {
    errorMessage.value = ''
    const newuser = {
      id: Date.now(),
      firstName: firstname,
      lastName: secondname,
      username: username,
      password: password,
      role: userrole,
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

    const craetedUser = {
      ...data,
      firstName: firstname,
      lastName: secondname,
      username: username,
      password: password,
      role: userrole,
    }

    users.value.push(craetedUser)
    sessionStorage.setItem('users', JSON.stringify(users.value))

    // userLogin.value = craetedUser
    // sessionStorage.setItem('userLogin', JSON.stringify(userLogin.value))
    // return craetedUser
  }

  return {
    errorMessage,
    handleLogin,
    handleCreate,
    userLogin,
    deleteTheUser,
    users,
    getUsers,
    changeUserRole,
    getUserLogin,
    adminHandleCreate,
    changeUserInfo,
    logOut,
    changeUserActivity,
    modal,
    editmodal,
    isLogin,
    infoText,
    infoButton,
    linkAccountText,
    subFormText,
  }
})
