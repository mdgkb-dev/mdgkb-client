import Field from '@/classes/Field';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IFieldValueFile from '@/interfaces/IFieldValueFile';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyApplicationPointsAchievement from '@/interfaces/IResidencyApplicationPointsAchievement';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

import CandidateApplication from './CandidateApplication';
import Child from './Child';
import DpoApplication from './DpoApplication';
import FieldValue from './FieldValue';
import FileInfo from './File/FileInfo';
import FormStatus from './FormStatus';
import FormStatusGroup from './FormStatusGroup';
import PostgraduateApplication from './PostgraduateApplication';
import ResidencyApplication from './ResidencyApplication';
import User from './User';
import VacancyResponse from './VacancyResponse';
import VisitsApplication from './VisitsApplication';

export default class Form implements IForm {
  id?: string;
  title?: string;
  modComment?: string;
  name = '';
  emailNotify = false;
  description = '';
  code = '';
  approvingDate?: Date;
  fields: IField[] = [];
  fieldsForDelete: string[] = [];
  fieldValues: IFieldValue[] = [];
  fieldValuesForDelete: string[] = [];
  validated = true;
  isNew = true;
  viewedByUser = false;
  createdAt: Date = new Date();
  user = new User();
  formStatus = new FormStatus();
  dpoApplication?: IDpoApplication;
  defaultFormStatus?: IFormStatus;
  defaultFormStatusId?: string;
  formStatusGroup?: IFormStatusGroup;
  formStatusGroupId?: string;
  child = new Child();
  childId?: string;
  personalDataAgreement = new FileInfo();
  personalDataAgreementId?: string;
  withPersonalDataAgreement = false;
  agreedWithPersonalDataAgreement = false;
  showPersonalDataAgreementError = false;
  // changed = false;

  postgraduateApplication?: IPostgraduateApplication;
  candidateApplication?: ICandidateApplication;
  residencyApplication?: IResidencyApplication;
  visitsApplication?: IVisitsApplication;
  vacancyResponse?: IVacancyResponse;

  constructor(form?: IForm) {
    if (!form) {
      return;
    }
    this.id = form.id;
    this.title = form.title;
    this.modComment = form.modComment;
    if (form.approvingDate) {
      this.approvingDate = new Date(form.approvingDate);
    }
    this.description = form.description;
    if (form.createdAt) {
      this.createdAt = form.createdAt;
    }
    if (form.isNew !== undefined) {
      this.isNew = form.isNew;
    }
    if (form.viewedByUser !== undefined) {
      this.viewedByUser = form.viewedByUser;
    }
    if (form.validated) {
      this.validated = form.validated;
    }
    this.code = form.code;
    if (form.user) {
      this.user = new User(form.user);
    }
    if (form.formStatus) {
      this.formStatus = new FormStatus(form.formStatus);
    }
    if (form.fields) {
      this.fields = form.fields.map((item: IField) => new Field(item));
    }
    if (form.fieldValues) {
      this.fieldValues = form.fieldValues.map((item: IFieldValue) => new FieldValue(item));
    }
    if (form.dpoApplication) {
      this.dpoApplication = new DpoApplication(form.dpoApplication);
    }
    if (form.formStatusGroup) {
      this.formStatusGroup = new FormStatusGroup(form.formStatusGroup);
    }
    this.formStatusGroupId = form.formStatusGroupId;
    if (form.defaultFormStatus) {
      this.defaultFormStatus = new FormStatus(form.defaultFormStatus);
    }
    this.defaultFormStatusId = form.defaultFormStatusId;
    if (form.child) {
      this.child = new Child(form.child);
    }
    this.childId = form.childId;
    if (form.personalDataAgreement) {
      this.personalDataAgreement = new FileInfo(form.personalDataAgreement);
    }
    if (form.withPersonalDataAgreement !== undefined) {
      this.withPersonalDataAgreement = form.withPersonalDataAgreement;
    }
    this.personalDataAgreementId = form.personalDataAgreementId;
    if (form.agreedWithPersonalDataAgreement !== undefined) {
      this.agreedWithPersonalDataAgreement = form.agreedWithPersonalDataAgreement;
    }

    if (form.postgraduateApplication) {
      this.postgraduateApplication = new PostgraduateApplication(form.postgraduateApplication);
    }
    if (form.candidateApplication) {
      this.candidateApplication = new CandidateApplication(form.candidateApplication);
    }
    if (form.residencyApplication) {
      this.residencyApplication = new ResidencyApplication(form.residencyApplication);
    }
    if (form.visitsApplication) {
      this.visitsApplication = new VisitsApplication(form.visitsApplication);
    }
    if (form.vacancyResponse) {
      this.vacancyResponse = new VacancyResponse(form.vacancyResponse);
    }
  }

  addField(field?: IField): void {
    this.fields.push(field ?? new Field());
  }
  removeField(index: number): void {
    const idForDelete = this.fields[index].id;
    if (idForDelete) this.fieldsForDelete.push(idForDelete);
    this.fields.splice(index, 1);
  }
  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fields.forEach((i: IField) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    fileInfos.push(this.personalDataAgreement);
    return fileInfos;
  }
  getFieldValuesFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fieldValues.forEach((i: IFieldValue) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
      if (i.fieldValuesFiles.length > 0) {
        i.fieldValuesFiles.forEach((fvf: IFieldValueFile) => fileInfos.push(fvf.fileInfo));
      }
    });
    if (this.residencyApplication) {
      this.residencyApplication.residencyApplicationPointsAchievements.forEach((r: IResidencyApplicationPointsAchievement) => {
        fileInfos.push(r.fileInfo);
      });
    }

    return fileInfos;
  }

  findFieldValue(fieldId: string): IFieldValue | undefined {
    return this.fieldValues.find((fieldValue: IFieldValue) => fieldId === fieldValue.fieldId);
  }

  getFieldValue(field: IField): string | number | Date | IFileInfo | boolean | undefined {
    if (!field.id) {
      return;
    }
    const fieldValue = this.findFieldValue(field.id);
    if (!fieldValue) {
      return;
    }
    if (field.valueType.isString()) {
      return fieldValue.valueString;
    }
    if (field.valueType.isNumber()) {
      return fieldValue.valueNumber;
    }
    if (field.valueType.isDate()) {
      return fieldValue.valueDate;
    }
    if (field.valueType.isFile()) {
      return fieldValue.file;
    }
  }
  initFieldsValues(): void {
    this.fields.forEach((field: IField) => {
      const fieldValue = new FieldValue();
      fieldValue.fieldId = field.id;
      fieldValue.field = new Field(field);
      this.fieldValues.push(fieldValue);
    });
  }

  validate(withoutFiles?: boolean): void {
    this.validated = true;

    this.fieldValues.forEach((el: IFieldValue) => {
      if (withoutFiles && (el.field?.valueType.isFile() || el.field?.valueType.isFiles())) {
        return;
      }

      if (el.field?.required) {
        el.validate();
        if (el.showError) {
          console.log(el.field);
          this.validated = false;
        }
      }
    });

    if (this.withPersonalDataAgreement && !this.agreedWithPersonalDataAgreement) {
      this.showPersonalDataAgreementError = true;
      this.validated = false;
    }
  }

  clearValidate(): void {
    this.validated = true;
    this.fieldValues.forEach((el: IFieldValue) => {
      el.showError = false;
    });
  }

  getErrorFields(): IFieldValue[] {
    return this.fieldValues.filter((item) => item.showError === true);
  }

  getErrorMessage(): string {
    let errorMessage = '<strong>?????????????????? ???????????????????????? ?????????????????? ????????????:</strong><ul>';
    const errorFields = this.getErrorFields();
    errorFields.forEach((item) => {
      errorMessage += `<li>${item.field?.name}</li>`;
    });
    errorMessage += '</ul>';
    return errorMessage;
  }

  clearIds(): void {
    this.id = undefined;
    this.fields.forEach((el: IField) => {
      el.clearIds();
    });
    this.fieldValues.forEach((el: IFieldValue) => {
      el.clearIds();
    });
  }

  removeAllFieldsAndValues(): void {
    this.fields.forEach((el: IField) => {
      if (el.id) this.fieldsForDelete.push(el.id);
    });
    this.fieldValues.forEach((el: IFieldValue) => {
      if (el.id) this.fieldValuesForDelete.push(el.id);
    });
    this.fields = [];
    this.fieldValues = [];
  }
  applyFormPatternFields(pattern: IForm): void {
    this.fields = pattern.fields.map((el: IField) => {
      el.formId = undefined;
      el.fileId = undefined;
      // const fieldValue = new FieldValue();
      // fieldValue.fieldId = el.id;
      // fieldValue.field = new Field(el);
      // this.fieldValues.push(fieldValue);
      return el;
    });
  }
  isFieldValuesModChecked(): boolean {
    return this.fieldValues.every((el) => el.modChecked === true);
  }
  haveModComments(): boolean {
    return this.fieldValues.some((el) => el.modComment);
  }
  changeFieldValuesModChecked(modChecked: boolean): void {
    this.fieldValues.forEach((el: IFieldValue) => {
      el.modChecked = modChecked;
      el.modComment = '';
    });
  }
  // setNewStatus(statuses: IFormStatus[]): void {
  //   statuses.forEach((el: IFormStatus) => {
  //     if (el.isNew()) {
  //       this.formStatus = new FormStatus(el);
  //     }
  //   });
  // }
  setCpecifyStatus(statuses: IFormStatus[]): void {
    statuses.forEach((el: IFormStatus) => {
      if (el.isClarified()) {
        this.formStatus = new FormStatus(el);
      }
    });
  }
  setStatus(status: IFormStatus, statuses: IFormStatus[]): void {
    const newStatus = statuses.find((el: IFormStatus) => el.id === status.id);
    this.formStatus = new FormStatus(newStatus);
    console.log(this.formStatus);
    // this.emailNotify = true;
  }
  getFieldsWithModComemnts(): IField[] {
    return this.fields.filter((el: IField) => {
      if (!el.id) return;
      return this.findFieldValue(el.id)?.modComment && !this.findFieldValue(el.id)?.modChecked;
    });
  }
  updateViewedByUser(initialStatus: IFormStatus): void {
    console.log('initialStatus', initialStatus);
    console.log('this.viewedByUser BEFORE', this.viewedByUser);
    if (initialStatus && initialStatus.id !== this.formStatus.id) {
      this.viewedByUser = false;
    }
    console.log('this.viewedByUser AFTER', this.viewedByUser);
  }
  // static ApplyFormPattern(pattern: IForm): IForm {
  //   const form = new Form(pattern);
  //   form.id = undefined;
  //   form.fields.forEach((el: IField) => {
  // el.id = undefined;
  //     el.formId = undefined;
  //     el.fileId = undefined;
  //   });
  //   return form;
  // }

  getApplicationType(): string {
    if (this.dpoApplication) return this.dpoApplication.dpoCourse.isNmo ? '??????' : '??????';
    if (this.residencyApplication) return '????????????????????';
    if (this.postgraduateApplication) return '??????????????????????';
    if (this.candidateApplication) return '???????????????????????? ??????????????';
    if (this.visitsApplication) return '???????????? ???? ??????????????????';
    if (this.vacancyResponse) return '???????????? ???? ????????????????';
    return '';
  }

  getApplicationTypeLink(): string {
    if (this.dpoApplication) return `/dpo?mode=programs`;
    if (this.residencyApplication) return `/residency?mode=programs`;
    if (this.postgraduateApplication) return `/postgraduate?mode=programs`;
    if (this.candidateApplication) return `/postgraduate?mode=candidate`;
    if (this.visitsApplication) return `/application-car/8ccf8e9b-b487-493e-b451-60b193181f07`;
    if (this.vacancyResponse) return `/vacancies`;
    return '';
  }
  getApplicationName(): string {
    if (this.dpoApplication) return this.dpoApplication.dpoCourse.name;
    if (this.residencyApplication) return this.residencyApplication.residencyCourse.getMainSpecialization().name;
    if (this.postgraduateApplication) return this.postgraduateApplication.postgraduateCourse.getMainSpecialization().name;
    if (this.candidateApplication) return '???????????????????????? ??????????????';
    if (this.visitsApplication) return this.visitsApplication.division?.name;
    if (this.vacancyResponse) return this.vacancyResponse.vacancy.title;
    return '';
  }

  getApplicationNameLink(): string {
    if (this.dpoApplication) return `/courses/${this.dpoApplication.dpoCourse.slug}`;
    if (this.residencyApplication) return `/residency-courses/${this.residencyApplication.residencyCourse.id}`;
    if (this.postgraduateApplication)
      return `/postgraduate-courses/${this.postgraduateApplication.postgraduateCourse.getMainSpecialization().slug}`;
    if (this.candidateApplication) return `/postgraduate?mode=candidate`;
    if (this.visitsApplication) return `/divisions/${this.visitsApplication.division?.slug}`;
    if (this.vacancyResponse) return `/vacancies/${this.vacancyResponse.vacancy.slug}`;
    return '';
  }

  getRequiredForCancelFields(): IField[] {
    return this.fields.filter((f: IField) => f.requiredForCancel);
  }

  clearAllFields(): void {
    this.fields = [];
    this.fieldValues.forEach((fv: IFieldValue) => (fv.field = undefined));
  }

  getFieldsByCodes(codes: string[]): IField[] {
    return this.fields.filter((f: IField) => codes.includes(f.code));
  }
}
