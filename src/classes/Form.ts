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

export default class Form implements IForm {
  id?: string;
  title?: string;
  name = '';
  emailNotify = false;
  code = '';
  fields: IField[] = [];
  fieldsForDelete: string[] = [];
  fieldValues: IFieldValue[] = [];
  fieldValuesForDelete: string[] = [];
  validated = true;
  isNew = true;
  createdAt: Date = new Date();
  user = new User();
  formStatus = new FormStatus();
  dpoApplication?: IDpoApplication;
  postgraduateApplication?: IPostgraduateApplication;
  candidateApplication?: ICandidateApplication;
  residencyApplication?: IResidencyApplication;
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

  constructor(form?: IForm) {
    if (!form) {
      return;
    }
    this.id = form.id;
    this.title = form.title;
    if (form.createdAt) {
      this.createdAt = form.createdAt;
    }
    if (form.isNew !== undefined) {
      this.isNew = form.isNew;
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
    if (form.postgraduateApplication) {
      this.postgraduateApplication = new PostgraduateApplication(form.postgraduateApplication);
    }
    if (form.candidateApplication) {
      this.candidateApplication = new CandidateApplication(form.candidateApplication);
    }
    if (form.residencyApplication) {
      this.residencyApplication = new ResidencyApplication(form.residencyApplication);
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
  }

  addField(field?: IField): void {
    this.fields.push(field ?? new Field());
  }
  removeField(index: number): void {
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

  validate(): void {
    this.validated = true;
    this.fieldValues.forEach((el: IFieldValue) => {
      if (el.field?.required) {
        el.validate();
        if (el.showError) {
          this.validated = false;
        }
      }
    });
    if (this.withPersonalDataAgreement && !this.agreedWithPersonalDataAgreement) {
      this.showPersonalDataAgreementError = true;
      this.validated = false;
    }
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
    // this.emailNotify = true;
  }
  getFieldsWithModComemnts(): IField[] {
    return this.fields.filter((el: IField) => {
      if (!el.id) return;
      return this.findFieldValue(el.id)?.modComment && !this.findFieldValue(el.id)?.modChecked;
    });
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
}
