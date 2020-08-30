import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Chat from '../components/Chat.vue'
import AddRoom from '../components/AddRoom.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: true,
    beforeEnter: (to, from, next) => {
      if(to.params.name){
        next()
      }else{
        next({name: 'Home'})
      }
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true
  },
  {
    path: '/addroom',
    name: 'AddRoom',
    component: AddRoom,
    props: true,
    beforeEnter: (to, from, next) => {
      if(to.params.name){
        next()
      }else{
        next({name: 'Home'})
      }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
