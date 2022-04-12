import ICenterSchema from '@/interfaces/schema/ICenterSchema';
import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IDivisionSchema from '@/interfaces/schema/IDivisionSchema';
import IDoctorSchema from '@/interfaces/schema/IDoctorSchema';
import IDoctorUserSchema from '@/interfaces/schema/IDoctorUserSchema';
import IDpoApplicationSchema from '@/interfaces/schema/IDpoApplicationSchema';
import IDpoCourseSchema from '@/interfaces/schema/IDpoCourseSchema';
import IDpoCourseSpecializationSchema from '@/interfaces/schema/IDpoCourseSpecializationSchema';
import IEducationPublicDocumentTypeSchema from '@/interfaces/schema/IEducationPublicDocumentTypeSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMedicalProfileSchema from '@/interfaces/schema/IMedicalProfileSchema';
import IPostgraduateCourseSchema from '@/interfaces/schema/IPostgraduateCourseSchema';
import IPublicDocumentTypeSchema from '@/interfaces/schema/IPublicDocumentTypeSchema';
import IResidencyCourseSchema from '@/interfaces/schema/IResidencyCourseSchema';
import ISpecializationSchema from '@/interfaces/schema/ISpecializationSchema';
import ITeacherSchema from '@/interfaces/schema/ITeacherSchema';
import IVacancySchema from '@/interfaces/schema/IVacancySchema';

export default interface ISchema {
  human: IHumanSchema;
  comment: ICommentsSchema;
  doctor: IDoctorSchema;
  doctorUser: IDoctorUserSchema;
  division: IDivisionSchema;
  center: ICenterSchema;
  medicalProfile: IMedicalProfileSchema;
  teacher: ITeacherSchema;
  dpoCourse: IDpoCourseSchema;
  specialization: ISpecializationSchema;
  vacancy: IVacancySchema;
  dpoCourseSpecialization: IDpoCourseSpecializationSchema;
  dpoApplication: IDpoApplicationSchema;
  postgraduateCourse: IPostgraduateCourseSchema;
  residencyCourse: IResidencyCourseSchema;
  educationPublicDocumentType: IEducationPublicDocumentTypeSchema;
  publicDocumentType: IPublicDocumentTypeSchema;
}
