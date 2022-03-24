import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDpoApplicationPage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoApplicationPage.vue';
import AdminDpoApplicationsList from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoApplicationsList.vue';
import AdminDpoCoursePage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursePage.vue';
import AdminDpoCoursesList from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursesList.vue';
import AdminEducationalOrganizationPage from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationPage.vue';
import AdminPostgraduateCoursePage from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminPostgraduateCoursePage.vue';
import AdminPostgraduateCoursesList from '@/components/admin/AdminEducationalOrganization/AdminPostgraduate/AdminPostgraduateCoursesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

// import AdminDpoCoursePage from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminPostgraduateCoursePage.vue';

export default [
  {
    path: '/admin/educational-organization',
    name: 'AdminEducationalOrganizationPage',
    component: AdminEducationalOrganizationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dpo/courses',
    name: 'AdminDpoCoursesList',
    component: AdminDpoCoursesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dpo/courses/new',
    name: 'AdminDpoCoursePageCreate',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dpo/courses/:id',
    name: 'AdminDpoCoursePageEdit',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/nmo/courses',
    name: 'AdminNmoCoursesList',
    component: AdminDpoCoursesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/nmo/courses/new',
    name: 'AdminNmoCoursePageCreate',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/nmo/courses/:id',
    name: 'AdminNmoCoursePageEdit',
    component: AdminDpoCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dpo/applications',
    name: 'AdminDpoApplicationsList',
    component: AdminDpoApplicationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/nmo/applications',
    name: 'AdminNmoApplicationsList',
    component: AdminDpoApplicationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dpo/applications/new',
    name: 'AdminDpoApplicationPageNew',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/dpo/applications/:id',
    name: 'AdminDpoApplicationPage',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/nmo/applications/new',
    name: 'AdminNmoApplicationPageNew',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/nmo/applications/:id',
    name: 'AdminNmoApplicationPage',
    component: AdminDpoApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/postgraduate-courses',
    name: 'AdminPostgraduateCoursesList',
    component: AdminPostgraduateCoursesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/postgraduate-courses/new',
    name: 'AdminPostgraduateCoursePageNew',
    component: AdminPostgraduateCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/postgraduate-courses/:id',
    name: 'AdminPostgraduateCoursePage',
    component: AdminPostgraduateCoursePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];
