import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminApplicationCarList from '@/components/admin/AdminApplicationCar/AdminApplicationCarList.vue';
import AdminApplicationCarPage from '@/components/admin/AdminApplicationCar/AdminApplicationCarPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/applications-cars',
    name: 'AdminApplicationCarList',
    component: AdminApplicationCarList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: true,
    },
  },
  {
    path: '/admin/applications-cars/new',
    name: 'AdminApplicationCarPageNew',
    component: AdminApplicationCarPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/applications-cars/:id',
    name: 'AdminApplicationCarPage',
    component: AdminApplicationCarPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
