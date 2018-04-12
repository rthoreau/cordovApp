import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/pages/Home.vue';
import Favorite from './components/pages/Favorite.vue';
import Search from './components/pages/Search.vue';
import Playlists from './components/pages/Playlists.vue';
import Playlist from './components/pages/Playlist.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/Favorite', component: Favorite },
    { path: '/Search', component: Search },
    { path: '/Playlists', component: Playlists },
    { path: '/Playlist/:id/:mode', component: Playlist },
    { path: '/Playlist/:id', component: Playlist }
  ]
});

export default router;
