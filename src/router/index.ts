import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import AboutPage from '@/components/About/AboutPage.vue';
import Contacts from '@/components/Contacts/Contacts.vue';
import CustomPage from '@/components/CustomPage.vue';
import DevPage from '@/components/DevPage.vue';
import DispanserizationPage from '@/components/Dispanserization/DispanserizationPage.vue';
import PublicDocumentsList from '@/components/Documents/PublicDocumentsList.vue';
import DonorRulesPage from '@/components/DonorRules/DonorRulesPage.vue';
import MainPage from '@/components/Main/MainPage.vue';
import MedicalOrganization from '@/components/MedicalOrganization/MedicalOrganization.vue';
import MedicalOrganizationStructure from '@/components/MedicalOrganization/MedicalOrganizationStructure.vue';
import MedicalProfilesList from '@/components/MedicalProfiles/MedicalProfilesList.vue';
import MedicalProfilesPage from '@/components/MedicalProfiles/MedicalProfilesPage.vue';
import MedicalWorkersList from '@/components/MedicalWorkers/MedicalWorkersList.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import PartnersPage from '@/components/Partners/PartnersPage.vue';
import PreparationsPage from '@/components/Preparations/PreparationsPage.vue';
import QuestionsAnswersPage from '@/components/Questions/QuestionsAnswersPage.vue';
import RefreshPasswordPage from '@/components/RefreshPasswordPage.vue';
import RejectEmailPage from '@/components/RejectEmailPage.vue';
import SearchPage from '@/components/Search/SearchPage.vue';
import ServiceQualityAssessmentPage from '@/components/ServiceQualityAssessment/ServiceQualityAssessmentPage.vue';
import SideOrganizationsPage from '@/components/SideOrganizations/SideOrganizationsPage.vue';
import SiteMap from '@/components/SiteMap/SiteMap.vue';
import StopComaPage from '@/components/StopComa/StopComaPage.vue';
import VisitsApplicationPage from '@/components/VisitsApplicationPage.vue';
import AppointmentsRoutes from '@/router/AppointmentsRoutes';
import CommentsRoutes from '@/router/CommentsRoutes';
import DivisionsRoutes from '@/router/DivisionsRoutes';
import DoctorsRoutes from '@/router/DoctorsRoutes';
import EducationalOrganizationRoutes from '@/router/EducationalOrganizationRoutes';
import HospitalizationsRoutes from '@/router/HospitalizationsRoutes';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import MapRoutes from '@/router/MapRoutes';
import NewsRoutes from '@/router/NewsRoutes';
import PaidProgramsRoutes from '@/router/PaidProgramsRoutes';
import PaidServicesRoutes from '@/router/PaidServicesRoutes';
import ProfileRoutes from '@/router/ProfileRoutes';
import ProjectsRoutes from '@/router/ProjectsRoutes';
import VacanciesRoutes from '@/router/VacanciesRoutes';
import scroll from '@/services/Scroll';
import TokenService from '@/services/Token';
import UserService from '@/services/User';
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

export const devGuard = (): void => {
  if (!UserService.isAdmin()) {
    router.push('/dev');
  }
};

export const adminGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  if (to.path != '/main') {
    try {
      await store.dispatch('auth/checkPathPermissions', to.matched[0].path);
    } catch (e) {
      await router.push('/');
    }
  }
  next();
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
    meta: { carousel: true, main: true, title: '??????????????' },
    // beforeEnter: isAuthorized,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    meta: { title: '?? ??????' },
    // beforeEnter: isAuthorized,
  },
  {
    path: '/stop-coma',
    name: 'StopComaPage',
    component: StopComaPage,
    meta: { title: '????????-????????' },
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/dispanserization',
    name: 'DispanserizationPage',
    component: DispanserizationPage,
    meta: { title: '??????????????????????????????' },
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/side-organizations',
    name: 'SideOrganizationsPage',
    component: SideOrganizationsPage,
    meta: { title: '???????????????? ???? ??????????????????????' },
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/partners',
    name: 'PartnersPage',
    meta: { title: '???????? ????????????????' },
    component: PartnersPage,
  },
  {
    path: '/medical-organization-structure',
    name: 'MedicalOrganizationStructure',
    meta: { title: '?????????????????? ?? ???????????? ????????????????????' },
    component: MedicalOrganizationStructure,
  },
  {
    path: '/medical-organization',
    name: 'MedicalOrganization',
    meta: { title: '???????????? ?? ?????????????????????? ??????????????????????' },
    component: MedicalOrganization,
  },
  {
    path: '/questions',
    name: 'QuestionsAnswersPage',
    meta: { title: '?????????????? ?? ????????????' },
    component: QuestionsAnswersPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/preparations',
    name: 'PreparationsPage',
    meta: { title: '???????????????????? ?? ??????????????????????????' },
    component: PreparationsPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/donor-rules',
    name: 'DonorRulesPage',
    meta: { title: '?????????????? ?????? ??????????????' },
    component: DonorRulesPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/medical-profiles/:id',
    name: 'MedicalProfilesPage',
    meta: { title: '?????????????? ????????????' },
    component: MedicalProfilesPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
      devGuard();
    },
  },
  {
    path: '/medical-profiles',
    name: 'MedicalProfilesList',
    meta: { title: '?????????????? ????????????' },
    component: MedicalProfilesList,
    beforeEnter(to, from, next) {
      isAuthorized(next);
    },
  },
  {
    path: '/public-documents',
    name: 'PublicDocumentsList',
    meta: { title: '??????????????????' },
    component: PublicDocumentsList,
  },
  {
    path: '/heads',
    name: 'HeadsList',
    meta: { title: '??????????????????????' },
    component: MedicalWorkersList,
  },
  {
    path: '/site-map',
    name: 'SiteMap',
    meta: { title: '?????????? ??????????' },
    component: SiteMap,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: { title: '????????????????' },
    component: Contacts,
  },
  {
    path: '/service-quality-assessment',
    name: 'ServiceQualityAssessmentPage',
    meta: { title: '?????????????????????? ???????????? ???????????????? ???????????????? ??????????' },
    component: ServiceQualityAssessmentPage,
  },
  {
    path: '/search',
    name: 'SearchPage',
    meta: { title: '??????????' },
    component: SearchPage,
    beforeEnter(to, from, next) {
      isAuthorized(next);
      devGuard();
    },
  },
  {
    path: '/restore/password/:userId/:uniqueId',
    name: 'RefreshPasswordPage',
    meta: { title: '?????????? ????????????' },
    component: RefreshPasswordPage,
  },
  {
    path: '/reject-email/:userId/:uniqueId',
    name: 'RejectEmailPage',
    meta: { title: '?????????? ????????????' },
    component: RejectEmailPage,
  },
  {
    path: '/access-profile/:userId/:uniqueId',
    name: 'ProfilePasswordPage',
    component: RefreshPasswordPage,
  },
  {
    path: '/visits-application/:gateId',
    name: 'VisitsApplicationPage',
    component: VisitsApplicationPage,
  },
  ...HospitalizationsRoutes,
  ...DoctorsRoutes,
  ...DivisionsRoutes,
  ...MapRoutes,
  ...NewsRoutes,
  ...PaidServicesRoutes,
  ...CommentsRoutes,
  ...ProfileRoutes,
  ...EducationalOrganizationRoutes,
  ...ProjectsRoutes,
  ...PaidProgramsRoutes,
  ...AppointmentsRoutes,
  ...indexAdminRoutes,
  ...VacanciesRoutes,
  {
    path: '/pages/:slug',
    name: 'CustomPage',
    component: CustomPage,
  },
  {
    path: '/dev',
    name: 'DevPage',
    component: DevPage,
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
  scroll();
});

// router.beforeEach(isAuthorized);
router.beforeEach(adminGuard);
export default router;
