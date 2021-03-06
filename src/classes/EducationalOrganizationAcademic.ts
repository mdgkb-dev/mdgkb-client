import Doctor from '@/classes/Doctor';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';

export default class EducationalOrganizationAcademic implements IEducationalOrganizationAcademic {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();

  constructor(i?: IEducationalOrganizationAcademic) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.doctorId = i.doctorId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
  }
}
