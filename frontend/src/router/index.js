import Vue from 'vue';
import VueRouter from 'vue-router';
import pocetna from '@/views/pocetna.vue';
import login from '@/views/login.vue';
import signup from '@/views/signup.vue';
import home from '@/views/home.vue';
import aboutUs from '@/views/aboutUs.vue';
import contact from '@/views/contact.vue';
import crimes from '@/views/crimes.vue';
import profile from '@/views/myProfile.vue';
import notifications from '@/views/notifications.vue';
import admin from '@/views/admin.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'pocetna',
      component: pocetna,
      meta: { requiresAuth: false, requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: false, requiresGuest: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: { requiresAuth: false, requiresGuest: true },
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { requiresAuth: true },
    },
    {
      path: '/aboutus',
      name: 'aboutUs',
      component: aboutUs,
      meta: { requiresAuth: true },
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: { requiresAuth: true },
    },
    {
      path: '/crimes',
      name: 'crimes',
      component: crimes,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: notifications,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin'); 

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    } else {
      if (isAdmin === 'true') {
        if (to.name === 'admin') {
          next();
        } else {
          next('/admin');
        }
      } else {
        if (to.name === 'admin') {
          next('/home'); 
        } else {
          next();
        }
      }
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (token) {
      next('/home');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
