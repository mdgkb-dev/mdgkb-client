import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDpoApplicationSchema extends IBaseSchema {
  createdAt: string;
  isNmo: string;
  formStatusId: string;
}
