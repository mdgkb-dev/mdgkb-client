import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from 'vue-router';

import AboutPage from '@/components/About/AboutPage.vue';
import CustomPage from '@/components/CustomPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import PublicDocumentsList from '@/components/Documents/PublicDocumentsList.vue';
import DonorRules from '@/components/DonorRules/DonorRules.vue';
import MainPage from '@/components/Main/MainPage.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import PartnersPage from '@/components/Partners/PartnersPage.vue';
import PreparationsPage from '@/components/Preparations/PreparationsPage.vue';
import QuestionsAnswersPage from '@/components/Questions/QuestionsAnswersPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';
import VacanciesPage from '@/components/Vacansies/VacanciesPage.vue';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import DoctorsRoutes from '@/router/DoctorsRoutes';
import EducationalOrganizationRoutes from '@/router/EducationalOrganizationRoutes';
import HospitalizationsRoutes from '@/router/HospitalizationsRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import NormativeDocumentsRoutes from '@/router/NormativeDocumentsRoutes';
import PaidProgramsRoutes from '@/router/PaidProgramsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import ProjectsRoutes from '@/router/ProjectsRoutes';
import TokenService from '@/services/Token';
import MainLayout from '@/views/main/MainLayout.vue';

import store from '../store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const user = localStorage.getItem('user');
  if (user) {
    store.commit('auth/setIsAuth', true);
  }
  next();
};

export const authGuard = (): void => {
  if (!TokenService.isAuth()) {
    router.push('/');
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    redirect: '/main',
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
    meta: { carousel: true },
    // beforeEnter: isAuthorized,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    // beforeEnter: isAuthorized,
  },
  {
    path: '/stop-coma',
    name: 'StopComaPage',
    component: StopComaPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/side-organizations',
    name: 'SideOrganizationsPage',
    component: SideOrganizationsPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/vacancies',
    name: 'VacanciesPage',
    component: VacanciesPage,
  },
  {
    path: '/partners',
    name: 'PartnersPage',
    component: PartnersPage,
  },
  {
    path: '/questions',
    name: 'QuestionsAnswersPage',
    component: QuestionsAnswersPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/preparations',
    name: 'PreparationsPage',
    component: PreparationsPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/donor-rules',
    name: 'DonorRules',
    component: DonorRules,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/public-documents',
    name: 'PublicDocumentsList',
    component: PublicDocumentsList,
  },
  ...HospitalizationsRoutes,
  ...DoctorsRoutes,
  ...DivisionsRoutes,
  ...MapRoutes,
  ...NewsRoutes,
  ...NormativeDocumentsRoutes,
  ...PaidServicesRoutes,
  ...ProfileRoutes,
  ...EducationalOrganizationRoutes,
  ...ProjectsRoutes,
  ...PaidProgramsRoutes,
  ...indexAdminRoutes,
  {
    path: '/pages/:slug',
    name: 'CustomPage',
    component: CustomPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(() => {
  window.scrollTo(0, 0);
});

// router.beforeEach(isAuthorized);

export default router;
