import IUser from '@/interfaces/IUser';

export interface State {
  items: IUser[];
  item?: IUser;
  count: number;
  emailExists: boolean;
  authPageEmail: string;
}
