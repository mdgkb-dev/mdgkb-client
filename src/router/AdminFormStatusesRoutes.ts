import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminFormStatusesList from '@/components/admin/AdminFormStatuses/AdminFormStatusesList.vue';
import AdminFormStatusGroupsList from '@/components/admin/AdminFormStatuses/AdminFormStatusGroupsList.vue';
import AdminFormStatusPage from '@/components/admin/AdminFormStatuses/AdminFormStatusPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/form-status-groups',
    name: 'AdminFormStatusGroupsList',
    component: AdminFormStatusGroupsList,
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
    path: '/admin/form-statuses/:groupId?',
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
    path: '/admin/form-status/:groupId?/new',
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
    path: '/admin/form-status/:groupId?/:id',
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
