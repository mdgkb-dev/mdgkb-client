import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminFormStatusesList from '@/components/admin/AdminFormStatuses/AdminFormStatusesList.vue';
import AdminFormStatusPage from '@/components/admin/AdminFormStatuses/AdminFormStatusPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/form-statuses',
    name: 'AdminFormStatusesList',
    component: AdminFormStatusesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/form-statuses/new',
    name: 'AdminFormStatusPageCreate',
    component: AdminFormStatusPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/form-statuses/:id',
    name: 'AdminFormStatusPageUpdate',
    component: AdminFormStatusPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
