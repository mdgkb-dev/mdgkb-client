import Division from '@/classes/buildings/Division';
import Gate from '@/classes/Gate';
import IDivision from '@/interfaces/buildings/IDivision';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IGate from '@/interfaces/IGate';
import IVisit from '@/interfaces/IVisit';
import IVisitsApplication from '@/interfaces/IVisitsApplication';

import Form from './Form';
import Visit from './Visit';

export default class VisitsApplication implements IVisitsApplication {
  id?: string;
  division: IDivision = new Division();
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  withCar = false;

  formValue = new Form();
  formValueId?: string;

  visits: IVisit[] = [];
  visitsForDelete: string[] = [];

  constructor(i?: IVisitsApplication) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.divisionId = i.divisionId;
    this.gateId = i.gateId;
    this.formValueId = i.formValueId;
    this.withCar = i.withCar;
    if (i.division) {
      this.division = new Division(i.division);
    }
    if (i.gate) {
      this.gate = new Gate(i.gate);
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
    if (i.visits) {
      this.visits = i.visits.map((item: IVisit) => new Visit(item));
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
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
}
