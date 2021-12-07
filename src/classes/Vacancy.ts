import Division from '@/classes/buildings/Division';
import VacancyResponse from '@/classes/VacancyResponse';
import IDivision from '@/interfaces/buildings/IDivision';
import IVacancy from '@/interfaces/vacancies/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default class Vacancy implements IVacancy {
  id?;
  title = '';
  description = '';
  specialization = '';
  salary = '';
  archived = false;
  vacancyResponses: IVacancyResponse[] = [];
  requirements = '';
  experience = '';
  duties = '';
  schedule = '';
  division?: IDivision;
  divisionId?: string;
  date: Date = new Date();

  constructor(vacancy?: IVacancy) {
    if (!vacancy) {
      return;
    }
    this.id = vacancy.id;
    this.title = vacancy.title;
    this.description = vacancy.description;
    this.specialization = vacancy.specialization;
    this.salary = vacancy.salary;
    this.archived = vacancy.archived;
    this.requirements = vacancy.requirements;
    this.experience = vacancy.experience;
    this.duties = vacancy.duties;
    this.schedule = vacancy.schedule;
    this.date = vacancy.date;

    if (vacancy.vacancyResponses) {
      this.vacancyResponses = vacancy.vacancyResponses.map((response: IVacancyResponse) => new VacancyResponse(response));
    }
    if (vacancy.division) {
      this.division = new Division(vacancy.division);
    }
    this.divisionId = vacancy.divisionId;
  }

  seeAllResponses(): void {
    this.vacancyResponses.forEach((vacancyResponse: IVacancyResponse) => (vacancyResponse.viewed = true));
  }

  withNewResponses(): boolean {
    return this.vacancyResponses.some((vacancyResponse: IVacancyResponse) => !vacancyResponse.viewed);
  }

  countResponses(onlyNew: boolean): number {
    if (!onlyNew) {
      return this.vacancyResponses.length;
    }
    return this.vacancyResponses.filter((response: IVacancyResponse) => !response.viewed).length;
  }
}
