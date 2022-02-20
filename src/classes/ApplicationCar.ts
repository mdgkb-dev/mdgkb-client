import Division from '@/classes/buildings/Division';
import User from '@/classes/User';
import IDivision from '@/interfaces/buildings/IDivision';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IUser from '@/interfaces/IUser';
import TokenService from '@/services/Token';

export default class ApplicationCar implements IApplicationCar {
  id?: string;
  carBrand = '';
  carNumber = '';
  date: Date = new Date();
  division?: IDivision;
  divisionId?: string;
  user: IUser = new User();
  userId?: string;

  constructor(i?: IApplicationCar) {
    if (!i) {
      if (TokenService.isAuth()) {
        this.user = new User(TokenService.getUser());
      }
      return;
    }
    this.id = i.id;
    this.carBrand = i.carBrand;
    this.carNumber = i.carNumber;
    this.date = i.date;
    this.divisionId = i.divisionId;
    this.userId = i.userId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    if (i.user) {
      this.user = new User(i.user);
    }
  }
}
