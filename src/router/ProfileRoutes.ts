import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import ProfileChildrenPage from '@/components/Profile/ProfileChildrenPage.vue';
import EditApplicationPage from '@/components/Profile/ProfileDailyMenuOrders/EditApplicationPage.vue';
import ProfileDailyMenuOrders from '@/components/Profile/ProfileDailyMenuOrders/ProfileDailyMenuOrders.vue';
import ProfileSettingsPage from '@/components/Profile/ProfileDailyMenuOrders/ProfileSettingsPage.vue';
import ProfileDonor from '@/components/Profile/ProfileDonor.vue';
import ProfileEditPage from '@/components/Profile/ProfileEditPage.vue';
import ProfileInfoPage from '@/components/Profile/ProfileInfoPage.vue';
import ProfileQuestionPage from '@/components/Profile/ProfileQuestionPage.vue';
import QuestionAnswerPage from '@/components/Profile/QuestionAnswerPage.vue';
import UserCommentsPage from '@/components/Profile/UserCommentsPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfileInfoPage',
    component: ProfileInfoPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: 'my' },
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: 'my' },
  },
  {
    path: '/profile/questions',
    name: 'ProfileQuestions',
    component: ProfileQuestionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: true },
  },
  {
    path: '/profile/donor',
    name: 'ProfileDonor',
    component: ProfileDonor,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: true },
  },
  {
    path: '/profile/children',
    name: 'ProfileChildren',
    component: ProfileChildrenPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: true },
  },
  {
    path: '/profile/daily-menu-orders',
    name: 'ProfileDailyMenuOrders',
    component: ProfileDailyMenuOrders,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
  {
    path: '/profile/question-answer',
    name: 'QuestionAnswerPage',
    component: QuestionAnswerPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'question-answer' },
  },
  {
    path: '/profile/user-comments',
    name: 'UserCommentsPage',
    component: UserCommentsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'user-comments' },
  },
  {
    path: '/profile/settings',
    name: 'ProfileSettingsPage',
    component: ProfileSettingsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'settings' },
  },
  {
    path: '/profile/residency-applications',
    name: 'EditApplicationPage',
    component: EditApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
];

export default ProfileRoutes;
