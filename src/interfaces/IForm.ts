import IField from '@/interfaces/IField';

import IFileInfo from './files/IFileInfo';
import ICandidateApplication from './ICandidateApplication';
import IDpoApplication from './IDpoApplication';
import IFieldValue from './IFieldValue';
import IFormStatus from './IFormStatus';
import IPostgraduateApplication from './IPostgraduateApplication';
import IUser from './IUser';

export default interface IForm {
  id?: string;
  title?: string;
  code: string;
  fields: IField[];
  fieldsForDelete: string[];
  fieldValues: IFieldValue[];
  formStatus: IFormStatus;
  fieldValuesForDelete: string[];
  validated?: boolean;
  createdAt?: Date;
  isNew: boolean;
  user: IUser;
  dpoApplication?: IDpoApplication;
  postgraduateApplication?: IPostgraduateApplication;
  candidateApplication?: ICandidateApplication;

  addField(field?: IField): void;
  removeField(index: number): void;
  getFileInfos: () => IFileInfo[];
  getFieldValuesFileInfos: () => IFileInfo[];
  initFieldsValues: () => void;
  getFieldValue: (field: IField) => string | number | Date | IFileInfo | boolean | undefined;
  findFieldValue: (fieldId: string) => IFieldValue | undefined;
  validate: () => void;
  clearIds: () => void;
  removeAllFieldsAndValues: () => void;
  applyFormPatternFields: (pattern: IForm) => void;
  isFieldValuesModChecked: () => boolean;
  changeFieldValuesModChecked: (modChecked: boolean) => void;
  setNewStatus: (statuses: IFormStatus[]) => void;
  setStatus: (status: IFormStatus, statuses: IFormStatus[]) => void;
}
