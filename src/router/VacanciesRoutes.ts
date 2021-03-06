import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import VacanciesList from '@/components/Vacansies/VacanciesList.vue';
import VacancyPage from '@/components/Vacansies/VacancyPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/vacancies',
    name: 'VacanciesList',
    component: VacanciesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/vacancies/:slug',
    name: 'VacancyPage',
    component: VacancyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
