import Vuex, { StoreOptions } from 'vuex';

import * as lib from '@/services/store/index';
import { admin } from '@/store/modules/admin';
import { agePeriods } from '@/store/modules/agePeriods';
import { appointments } from '@/store/modules/appointments';
import { appointmentsTypes } from '@/store/modules/appointmentsTypes';
import auth from '@/store/modules/auth';
import { banners } from '@/store/modules/banners';
import { buildings } from '@/store/modules/buildings';
import { calendar } from '@/store/modules/calendar';
import { callbacks } from '@/store/modules/callbacks';
import { candidateApplications } from '@/store/modules/candidateApplications';
import { candidateExams } from '@/store/modules/candidateExams';
import { chatMessages } from '@/store/modules/chatMessages';
import { chats } from '@/store/modules/chats';
import { children } from '@/store/modules/children';
import comments from '@/store/modules/comments';
import { cropper } from '@/store/modules/cropper';
import { dailyMenuOrders } from '@/store/modules/dailyMenuOrders';
import { dailyMenus } from '@/store/modules/dailyMenus';
import { dailyMenuItems } from '@/store/modules/dailyMenusItems';
import dataExport from '@/store/modules/dataExport';
import { diets } from '@/store/modules/diets';
import { dietsGroups } from '@/store/modules/dietsGroups';
import { dishesGroups } from '@/store/modules/dishesGroups';
import { dishesSamples } from '@/store/modules/dishesSamples';
import { divisions } from '@/store/modules/divisions';
import { doctors } from '@/store/modules/doctors';
import { donorRules } from '@/store/modules/donorRules';
import { dpoApplications } from '@/store/modules/dpoApplications';
import { educationalAcademics } from '@/store/modules/educationalAcademics';
import { educationalManagers } from '@/store/modules/educationalManagers';
import { educationYears } from '@/store/modules/educationYears';
import { employees } from '@/store/modules/employees';
import { entrances } from '@/store/modules/entrances';
import { events } from '@/store/modules/events';
import { faqs } from '@/store/modules/faqs';
import { fileInfos } from '@/store/modules/fileInfos';
import { filter } from '@/store/modules/filter';
import { formPatterns } from '@/store/modules/formPatterns';
import { formStatuses } from '@/store/modules/formStatuses';
import { formStatusGroups } from '@/store/modules/formStatusGroups';
import { formValues } from '@/store/modules/formValues';
import { gates } from '@/store/modules/gates';
import { heads } from '@/store/modules/heads';
import { holidayForms } from '@/store/modules/holidayforms';
import { hospitalizations } from '@/store/modules/hospitalizations';
import { hospitalizationsTypes } from '@/store/modules/hospitalizationsTypes';
import { map } from '@/store/modules/map';
import { mapNodes } from '@/store/modules/mapNodes';
import { mapRoutes } from '@/store/modules/mapRoutes';
import { medicalProfiles } from '@/store/modules/medicalProfiles';
import { meta } from '@/store/modules/meta';
import { news } from '@/store/modules/news';
import { newsSlides } from '@/store/modules/newsSlides';
import { nmoCourses } from '@/store/modules/nmoCourses';
import { pages } from '@/store/modules/pages';
import { pageSections } from '@/store/modules/pageSections';
import { pageSideMenus } from '@/store/modules/pageSideMenus';
import { pagination } from '@/store/modules/pagination';
import { paidPrograms } from '@/store/modules/paidPrograms';
import { paidProgramsGroups } from '@/store/modules/paidProgramsGroups';
import { paidServices } from '@/store/modules/paidServices';
import { partners } from '@/store/modules/partners';
import { partnerTypes } from '@/store/modules/partnerTypes';
import { pointsAchievements } from '@/store/modules/pointsAchievements';
import { postgraduateApplications } from '@/store/modules/postgraduateApplications';
import { postgraduateCourses } from '@/store/modules/postgraduateCourses';
import { preparations } from '@/store/modules/preparations';
import { projects } from '@/store/modules/projects';
import { questions } from '@/store/modules/questions';
import { residencyApplications } from '@/store/modules/residencyApplications';
import { residencyCourses } from '@/store/modules/residencyCourses';
import { roles } from '@/store/modules/roles';
import search from '@/store/modules/search';
import { sideOrganizations } from '@/store/modules/sideOrganizations';
import { specializations } from '@/store/modules/specializations';
import { supportMessages } from '@/store/modules/supportMessages';
import { tags } from '@/store/modules/tags';
import { teachers } from '@/store/modules/teachers';
import { timetablePatterns } from '@/store/modules/timetablePatterns';
import { timetables } from '@/store/modules/timetables';
import { users } from '@/store/modules/users';
import { vacancies } from '@/store/modules/vacancies';
import { vacancyResponses } from '@/store/modules/vacancyResponses';
import { visitingRules } from '@/store/modules/visitingRules';
import { visitsApplications } from '@/store/modules/visitsApplications';

import RootState from './types';

const s: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    pageSections,
    auth,
    banners,
    cropper,
    buildings,
    divisions,
    doctors,
    sideOrganizations,
    tags,
    news,
    users,
    admin,
    timetables,
    map,
    pages,
    vacancies,
    vacancyResponses,
    search,
    hospitalizations,
    comments,
    faqs,
    newsSlides,
    questions,
    events,
    timetablePatterns,
    heads,
    paidProgramsGroups,
    visitingRules,
    projects,
    paidPrograms,
    partners,
    partnerTypes,
    preparations,
    donorRules,
    filter,
    meta,
    pagination,
    publicDocumentTypes: pageSideMenus,
    medicalProfiles,
    visitsApplications,
    callbacks,
    appointments,
    nmoCourses,
    teachers,
    entrances,
    educationalManagers,
    children,
    gates,
    specializations,
    dpoApplications,
    formPatterns,
    postgraduateCourses,
    postgraduateApplications,
    candidateExams,
    candidateApplications,
    roles,
    residencyCourses,
    formStatuses,
    educationYears,
    formValues,
    residencyApplications,
    educationalAcademics,
    formStatusGroups,
    pointsAchievements,
    diets,
    dietsGroups,
    agePeriods,
    employees,
    dishesGroups,
    dailyMenus,
    dishesSamples,
    hospitalizationsTypes,
    supportMessages,
    dailyMenuItems,
    appointmentsTypes,
    dailyMenuOrders,
    paidServices,
    calendar,
    chats,
    chatMessages,
    fileInfos,
    dataExport,
    holidayForms,
    mapRoutes,
    mapNodes,
    ...lib,
  },
};

export default new Vuex.Store<RootState>(s);
