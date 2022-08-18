import ICenterSchema from '@/interfaces/schema/ICenterSchema';
import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IDivisionCommentSchema from '@/interfaces/schema/IDivisionCommentSchema';
import IDivisionSchema from '@/interfaces/schema/IDivisionSchema';
import IDoctorCommentSchema from '@/interfaces/schema/IDoctorCommentSchema';
import IDoctorSchema from '@/interfaces/schema/IDoctorSchema';
import IDoctorUserSchema from '@/interfaces/schema/IDoctorUserSchema';
import IDpoApplicationSchema from '@/interfaces/schema/IDpoApplicationSchema';
import IDpoCourseSchema from '@/interfaces/schema/IDpoCourseSchema';
import IDpoCourseSpecializationSchema from '@/interfaces/schema/IDpoCourseSpecializationSchema';
import IEducationalOrganizationAcademicSchema from '@/interfaces/schema/IEducationalOrganizationAcademicSchema';
import IEducationPublicDocumentTypeSchema from '@/interfaces/schema/IEducationPublicDocumentTypeSchema';
import IEducationYearSchema from '@/interfaces/schema/IEducationYearSchema';
import IFormStatusSchema from '@/interfaces/schema/IFormStatusSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMedicalProfileSchema from '@/interfaces/schema/IMedicalProfileSchema';
import INewsCommentSchema from '@/interfaces/schema/INewsCommentSchema';
import INewsSchema from '@/interfaces/schema/INewsSchema';
import INewsToTag from '@/interfaces/schema/INewsToTag';
import IPathPermissionsSchema from '@/interfaces/schema/IPathPermissionsSchema';
import IPostgraduateApplicationSchema from '@/interfaces/schema/IPostgraduateApplicationSchema';
import IPostgraduateCourseSchema from '@/interfaces/schema/IPostgraduateCourseSchema';
import IPostgraduateCourseSpecializationSchema from '@/interfaces/schema/IPostgraduateCourseSpecializationSchema';
import IPublicDocumentTypeSchema from '@/interfaces/schema/IPublicDocumentTypeSchema';
import IQuestionSchema from '@/interfaces/schema/IQuestionSchema';
import IResidencyApplicationSchema from '@/interfaces/schema/IResidencyApplicationSchema';
import IResidencyCourseSchema from '@/interfaces/schema/IResidencyCourseSchema';
import IRoleSchema from '@/interfaces/schema/IRoleSchema';
import ISpecializationSchema from '@/interfaces/schema/ISpecializationSchema';
import ITeacherSchema from '@/interfaces/schema/ITeacherSchema';
import ITreatDirectionSchema from '@/interfaces/schema/ITreatDirectionSchema';
import IVacancyResponseSchema from '@/interfaces/schema/IVacancyResponseSchema';
import IVacancySchema from '@/interfaces/schema/IVacancySchema';
import IVisitsApplicationSchema from '@/interfaces/schema/IVisitsApplicationSchema';

import IUserSchema from './IUserSchema';

export default interface ISchema {
  human: IHumanSchema;
  comment: ICommentsSchema;
  doctor: IDoctorSchema;
  doctorUser: IDoctorUserSchema;
  user: IUserSchema;
  division: IDivisionSchema;
  center: ICenterSchema;
  medicalProfile: IMedicalProfileSchema;
  teacher: ITeacherSchema;
  dpoCourse: IDpoCourseSchema;
  specialization: ISpecializationSchema;
  vacancy: IVacancySchema;
  dpoCourseSpecialization: IDpoCourseSpecializationSchema;
  visitsApplication: IVisitsApplicationSchema;
  dpoApplication: IDpoApplicationSchema;
  residencyApplication: IResidencyApplicationSchema;
  postgraduateApplication: IPostgraduateApplicationSchema;
  postgraduateCourse: IPostgraduateCourseSchema;
  residencyCourse: IResidencyCourseSchema;
  educationPublicDocumentType: IEducationPublicDocumentTypeSchema;
  publicDocumentType: IPublicDocumentTypeSchema;
  educationYear: IEducationYearSchema;
  postgraduateCourseSpecialization: IPostgraduateCourseSpecializationSchema;
  educationalOrganizationAcademic: IEducationalOrganizationAcademicSchema;
  role: IRoleSchema;
  pathPermission: IPathPermissionsSchema;
  news: INewsSchema;
  newsToTag: INewsToTag;
  formStatus: IFormStatusSchema;
  question: IQuestionSchema;
  treatDirection: ITreatDirectionSchema;
  vacancyResponse: IVacancyResponseSchema;
  doctorComment: IDoctorCommentSchema;
  divisionComment: IDivisionCommentSchema;
  newsComment: INewsCommentSchema;
}
