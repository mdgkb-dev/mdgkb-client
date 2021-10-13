import IVacancy from '@/interfaces/vacancies/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export interface State {
  vacancies: IVacancy[];
  vacancy: IVacancy;
  vacancyResponse: IVacancyResponse;
}
