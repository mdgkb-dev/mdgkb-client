import IBuilding from '@/interfaces/buildings/IBuilding';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IDoctor from '@/interfaces/doctors/IDoctor';
import ISchedule from '@/interfaces/timetables/ISchedule';
import ITimetable from '@/interfaces/timetables/ITimetable';
import IVacancy from '@/interfaces/vacancies/IVacancy';

import IEntrance from './IEntrance';

export default interface IDivision {
  id?: string;
  name: string;
  info?: string;
  phone?: string;
  email?: string;
  address?: string;
  floorId?: string;
  entranceId?: string;
  entrance?: IEntrance;
  building?: IBuilding;
  slug?: string;
  doctors: IDoctor[];
  vacancies: IVacancy[];
  timetable: ITimetable;
  timetableId?: string;
  scheduleId?: string;
  schedule: ISchedule;
  divisionImages: IDivisionImage[];
  divisionImagesForDelete: string[];
  divisionImagesNames: string[];
  divisionComments: IDivisionComment[];
  timetableDaysForDelete: string[];
}
