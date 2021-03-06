import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IVacancySchema extends IBaseSchema {
  title: string;
  slug: string;
  name: string;
  minSalary: string;
  maxSalary: string;
  responsesCount: string;
  newResponsesCount: string;
  active: string;
  date: string;
  divisionId: string;
  fullName: string;
}
