import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminNewsSlideList from '@/components/admin/AdminNewsSlides/AdminNewsSlideList.vue';
import AdminNewsSlidePage from '@/components/admin/AdminNewsSlides/AdminNewsSlidePage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/news-slides',
    name: 'AdminNewsSlideList',
    component: AdminNewsSlideList,
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
    path: '/admin/news-slides/new',
    name: 'AdminNewsSlidePageCreate',
    component: AdminNewsSlidePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news-slides/:id',
    name: 'AdminNewsSlidePageUpdate',
    component: AdminNewsSlidePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
