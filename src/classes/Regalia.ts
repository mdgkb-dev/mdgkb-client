import IRegalia from '@/interfaces/IRegalia';

export default class Regalia implements IRegalia {
  id?: string;
  name = '';
  doctorId?: string;
  headId?: string;

  constructor(i?: IRegalia) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.doctorId = i.doctorId;
    this.headId = i.headId;
  }
}
