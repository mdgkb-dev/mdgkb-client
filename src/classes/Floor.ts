import Division from '@/classes/Division';
import IFloor from '@/interfaces/IFloor';
import ClassHelper from '@/services/ClassHelper';

export default class Floor implements IFloor {
  id?: string;
  number?: number;
  buildingId?: string = '';
  @ClassHelper.GetClassConstructor(Division)
  divisions: Division[] = [];

  constructor(i?: IFloor) {
    ClassHelper.BuildClass(this, i);
  }
}
