import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import ITimetable from '@/interfaces/timetables/ITimetable';
import IWeekday from '@/interfaces/timetables/IWeekday';

export default class Weekday implements IWeekday {
  id?: string;
  name: string = '';
  number: number = 0;

  constructor(i?: IWeekday) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.number = i.number;
  }
}
