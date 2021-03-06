import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPagesList from '@/components/admin/AdminPages/AdminPagesList.vue';
import AdminPagesPage from '@/components/admin/AdminPages/AdminPagesPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/pages',
    name: 'AdminPagesList',
    component: AdminPagesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages/new',
    name: 'AdminPagesPageCreate',
    component: AdminPagesPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/pages/:slug',
    name: 'AdminPagesPageEdit',
    component: AdminPagesPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
