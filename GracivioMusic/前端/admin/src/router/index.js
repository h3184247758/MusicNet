import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'],resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home'],resolve),
      children:[
        {
          path: '/Info',
          component: resolve => require(['../pages/InfoPage.vue'],resolve)
        },
        {
          path: '/User',
          component: resolve => require(['../pages/UserPage.vue'],resolve)
        },
        {
          path: '/Singer',
          component: resolve => require(['../pages/SingerPage.vue'],resolve)
        },
        {
          path: '/SongList',
          component: resolve => require(['../pages/SongListPage.vue'],resolve)
        },
        {
          path: '/Song',
          component: resolve => require(['../pages/SongPage.vue'],resolve)
        },
        {
          path: '/ListSong',
          component: resolve => require(['../pages/ListSongPage.vue'],resolve)
        },
      ]
    },
  ]
})
