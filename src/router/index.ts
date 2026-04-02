import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import NotesPage from '@/components/NotesPage.vue'
import AdminPage from '@/components/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginpage',
      component: LoginPage,
    },
    {
      path: '/admin/:username',
      component: AdminPage,
      props: true,
    },

    { path: '/user/:username', component: NotesPage, props: true },
  ],
})

export default router
