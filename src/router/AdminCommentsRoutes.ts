import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminCommentList from '@/components/admin/AdminComments/AdminCommentList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/comments',
    name: 'AdminAllCommentList',
    component: AdminCommentList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: true,
    },
  },
];
