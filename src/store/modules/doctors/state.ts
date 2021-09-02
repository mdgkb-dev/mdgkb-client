import IDoctor from '@/interfaces/doctors/IDoctor';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  doctors: IDoctor[];
  filteredDoctors: IDoctor[];
  doctor: IDoctor;
  divisionDoctors: IDoctor[];
  fileList: IFilesList[];
  comment: IDoctorComment;
}
