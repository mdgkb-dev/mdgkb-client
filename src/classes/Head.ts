import Department from '@/classes/Department';
import Employee from '@/classes/Employee';
import FileInfo from '@/services/classes/FileInfo.ts';
import Timetable from '@/classes/Timetable';
import Contact from '@/services/classes/Contact';
import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

export default class Head {
  id?: string;
  employee = new Employee();
  employeeId?: string;
  timetable: Timetable = new Timetable();
  timetableId?: string;
  position = '';
  photo = new FileInfo();
  photoId?: string;
  @ClassHelper.GetClassConstructor(Department)
  departments: Department[] = [];
  departmentsForDelete: string[] = [];
  isMain = false;
  contactInfo?: Contact = new Contact();
  contactInfoId?: string;
  order = 1;

  fullName?: string;

  constructor(i?: Head) {
    ClassHelper.BuildClass(this, i);
  }

  workNow(): boolean {
    const nowDay = this.timetable.getNowDay();
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    return nowDay.startTime < time && nowDay.endTime > time;
  }

  addDepartment(): void {
    this.departments.push(new Department());
  }

  removeDepartment(index: number): void {
    const idForDelete = this.departments[index].id;
    if (idForDelete) {
      this.departmentsForDelete.push(idForDelete);
    }
    this.departments.splice(index, 1);
  }

  getHuman(): Human {
    return this.employee.human;
  }

  static GetClassName(): string {
    return 'head';
  }
}
