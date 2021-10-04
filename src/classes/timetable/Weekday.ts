import IWeekday from '@/interfaces/timetables/IWeekday';

export default class Weekday implements IWeekday {
  id?: string;
  name = '';
  number = 0;

  constructor(i?: IWeekday) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.number = i.number;
  }

  isWeekend(): boolean {
    return this.number > 5;
  }

  isToday(): boolean {
    const nowDay = new Date().getDay() + 1;
    return this.number === nowDay;
  }
}
