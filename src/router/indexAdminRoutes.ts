import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminCommonVisitingRulesList from '@/components/admin/AdminCommonVisitingRules/AdminCommonVisitingRulesList.vue';
import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminCommentsRoutes from '@/router/AdminCommentsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminDocumentsTypeRoutes from '@/router/AdminDocumentsTypeRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminFaqsRoutes from '@/router/AdminFaqsRoutes';
import AdminHeadsRoutes from '@/router/AdminHeadsRoutes';
import AdminMenusRoutes from '@/router/AdminMenusRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminNewsSlideRoutes from '@/router/AdminNewsSlideRoutes';
import AdminPagesRoutes from '@/router/AdminPagesRoutes';
import AdminPaidServicesGroupsRoutes from '@/router/AdminPaidServicesGroupsRoutes';
import AdminPartnersRoutes from '@/router/AdminPartnersRoutes';
import AdminProjectRoutes from '@/router/AdminProjectRoutes';
import AdminQuestionsRoutes from '@/router/AdminQuestionsRoutes';
import AdminTimetablePatternRoutes from '@/router/AdminTimetablePatternRoutes';
import AdminVacanciesRoutes from '@/router/AdminVacanciesRoutes';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/common-visiting-rules',
    name: 'AdminCommonVisitingRulesList',
    component: AdminCommonVisitingRulesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  ...AdminDoctorsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
  ...AdminMenusRoutes,
  ...AdminPagesRoutes,
  ...AdminVacanciesRoutes,
  ...AdminDocumentsTypeRoutes,
  ...AdminCommentsRoutes,
  ...AdminFaqsRoutes,
  ...AdminNewsSlideRoutes,
  ...AdminQuestionsRoutes,
  ...AdminTimetablePatternRoutes,
  ...AdminHeadsRoutes,
  ...AdminPaidServicesGroupsRoutes,
  ...AdminProjectRoutes,
  ...AdminPartnersRoutes,
];
