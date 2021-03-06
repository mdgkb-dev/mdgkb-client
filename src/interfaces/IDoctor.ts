import IDivision from '@/interfaces/buildings/IDivision';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IPosition from '@/interfaces/IPosition';
import IRegalia from '@/interfaces/IRegalia';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';

import IEducationalOrganizationAcademic from './IEducationalOrganizationAcademic';

export default interface IDoctor {
  id?: string;
  human: IHuman;
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  mosDoctorLink?: string;
  onlineDoctorId?: string;
  show: boolean;
  timetable: ITimetable;
  timetableId?: string;
  position: IPosition;
  positionId?: string;
  tags?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  photoMiniId?: string;
  photoMini: IFileInfo;
  doctorComments: IDoctorComment[];
  academicDegree: string;
  academicRank: string;
  regalias: IRegalia[];
  regaliasForDelete: string[];
  educations: IEducation[];
  educationsForDelete: string[];
  timetableDaysForDelete: string[];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  experiences: IExperience[];
  experiencesForDelete: string[];
  doctorPaidServices: IDoctorPaidService[];
  doctorPaidServicesForDelete: string[];
  certificates: ICertificate[];
  certificatesForDelete: string[];
  educationalOrganizationAcademic?: IEducationalOrganizationAcademic;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  newsDoctors: INewsDoctor[];
  addDoctorPaidService: () => void;
  removeDoctorPaidService: (index: number) => void;

  addCertificate: () => void;
  removeCertificate: (index: number) => void;

  getFileInfos: () => IFileInfo[];
  getMosDoctorLink: () => string;
  getOnlineDoctorLink: () => string;
  setAcademic: () => void;

  removeFileInfo: () => void;
  removePhotoMini: () => void;
}
