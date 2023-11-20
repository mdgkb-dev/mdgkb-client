import Division from '@/classes/Division';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IGate from '@/interfaces/IGate';
import IVisit from '@/interfaces/IVisit';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import Visit from './Visit';

export default class VisitsApplication {
  id?: string;
  division: Division = new Division();
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  withCar = false;

  formValue = new Form();
  formValueId?: string;

  @ClassHelper.GetClassConstructor(Visit)
  visits: IVisit[] = [];
  visitsForDelete: string[] = [];
  //

  createdAt = '';
  childFullName = '';
  fullName = '';
  email = '';
  formStatusId = '';
  gateName = '';
  divisionName = '';
  constructor(i?: VisitsApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }

  addVisit(): void {
    this.visits.push(new Visit());
  }

  removeVisit(index: number): void {
    const idForDelete = this.visits[index].id;
    if (idForDelete) {
      this.visitsForDelete.push(idForDelete);
    }
    this.visits.splice(index, 1);
  }

  changeWithCar(value: boolean): void {
    this.withCar = value;
  }

  static GetClassName(): string {
    return 'visitsApplication';
  }
}
